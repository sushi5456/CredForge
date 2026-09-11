import { User, UserRole, LenderProfile, BorrowerProfile } from '../types';
import { mockDatabase } from './mockDatabase';
import { calculateLenderProfileCompletion, calculateBorrowerProfileCompletion } from '../utils/profileCompletion';

const STORAGE_KEY_CURRENT_USER = 'codevest_session';
const LEGACY_STORAGE_KEY = 'codevest_auth_session';

class AuthService {
  public getCurrentUser(): User | null {
    try {
      let data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (!data) {
        data = localStorage.getItem(LEGACY_STORAGE_KEY);
      }
      if (!data) return null;
      const parsed: User = JSON.parse(data);
      // Synchronize with fresh state in database if available
      const fresh = mockDatabase.getUserById(parsed.id);
      if (fresh) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(fresh));
        return fresh;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  public isUsernameTaken(username: string): boolean {
    return mockDatabase.isUsernameTaken(username);
  }

  public isEmailTaken(email: string): boolean {
    return mockDatabase.isEmailTaken(email);
  }

  public refreshSession(): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const fresh = mockDatabase.getUserById(current.id);
    if (fresh) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(fresh));
      return fresh;
    }
    return current;
  }

  public async login(
    usernameOrEmail: string,
    password: string,
    expectedRole?: UserRole
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanId = usernameOrEmail.toLowerCase().trim();
    const entry = mockDatabase.getUserByUsernameOrEmail(cleanId);

    if (!entry) {
      return { success: false, error: 'Invalid username or password.' };
    }

    // Role check if expected
    if (expectedRole && entry.user.role !== expectedRole) {
      const roleDisplayName =
        entry.user.role === 'lender'
          ? 'lender'
          : entry.user.role === 'borrower'
          ? 'borrower / business'
          : 'administrator';
      return {
        success: false,
        error: `This account is registered as a ${roleDisplayName}. Please use the ${entry.user.role} sign-in portal.`
      };
    }

    // Verify password against stored credential
    if (entry.passwordHash !== password) {
      return { success: false, error: 'Invalid username or password.' };
    }

    // Persist authenticated session
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(entry.user));
    return { success: true, user: entry.user };
  }

  public async registerLender(payload: {
    fullName: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    termsAccepted?: boolean;
    privacyAccepted?: boolean;
    riskDisclosureAccepted?: boolean;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanUsername = payload.username.toLowerCase().trim();
    if (cleanUsername.length < 4) {
      return { success: false, error: 'Username must be at least 4 characters.' };
    }
    if (/\s/.test(cleanUsername)) {
      return { success: false, error: 'Username cannot contain spaces.' };
    }
    if (this.isUsernameTaken(cleanUsername)) {
      return { success: false, error: 'Username already exists. Please choose another username.' };
    }

    const cleanEmail = payload.email.trim().toLowerCase();
    if (!cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (this.isEmailTaken(cleanEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const initialLenderProfile: LenderProfile = {
      fullName: payload.fullName.trim(),
      mobile: payload.mobile.trim(),
      profileStatus: 'INCOMPLETE',
      eligibilityStatus: 'PROFILE_INCOMPLETE',
      profileCompletion: 25,
      kycStatus: 'Not Started',
      availableCapital: 0,
      activeFinancing: 0,
      totalExposure: 0,
      preferredDownsideTolerance: 20000,
      preferredCategories: [],
      preferredTenureMonths: 12,
      preferredReturnRange: '13% - 16% p.a.',
      riskPreference: 'Balanced',
      termsAccepted: !!payload.termsAccepted,
      privacyAccepted: !!payload.privacyAccepted,
      riskDisclosureAccepted: !!payload.riskDisclosureAccepted,
      documents: [
        { id: 'doc-pan', name: 'PAN Card Copy', category: 'Identity', status: 'Not Uploaded' },
        { id: 'doc-id', name: 'Aadhaar / Passport', category: 'Identity', status: 'Not Uploaded' },
        { id: 'doc-bank', name: 'Bank Statement / Cancelled Cheque', category: 'Banking', status: 'Not Uploaded' }
      ]
    };

    const completion = calculateLenderProfileCompletion(initialLenderProfile);
    initialLenderProfile.profileCompletion = completion.totalPercentage;
    initialLenderProfile.eligibilityStatus = completion.eligibilityStatus;
    initialLenderProfile.profileStatus = completion.statusBadge;

    const newUser: User = {
      id: `usr-len-${Date.now()}`,
      username: cleanUsername,
      name: payload.fullName.trim(),
      email: cleanEmail,
      role: 'lender',
      createdAt: new Date().toISOString().split('T')[0],
      lenderProfile: initialLenderProfile
    };

    mockDatabase.saveUser(newUser, payload.password);
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  public async registerBorrower(payload: {
    authorizedName: string;
    username: string;
    email: string;
    mobile: string;
    designation: string;
    password: string;
    termsAccepted?: boolean;
    privacyAccepted?: boolean;
    dataConsentAccepted?: boolean;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanUsername = payload.username.toLowerCase().trim();
    if (cleanUsername.length < 4) {
      return { success: false, error: 'Username must be at least 4 characters.' };
    }
    if (/\s/.test(cleanUsername)) {
      return { success: false, error: 'Username cannot contain spaces.' };
    }
    if (this.isUsernameTaken(cleanUsername)) {
      return { success: false, error: 'Username already exists. Please choose another username.' };
    }

    const cleanEmail = payload.email.trim().toLowerCase();
    if (!cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (this.isEmailTaken(cleanEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const businessId = `biz-${Date.now()}`;
    const initialBorrowerProfile: BorrowerProfile = {
      authorizedPersonName: payload.authorizedName.trim(),
      designation: payload.designation.trim() || 'Managing Director & Founder',
      mobile: payload.mobile.trim(),
      email: cleanEmail,
      profileStatus: 'INCOMPLETE',
      verificationStatus: 'NOT_STARTED',
      visibilityStatus: 'PRIVATE',
      eligibilityStatus: 'PENDING',
      profileCompletion: 15,
      businessName: '',
      entityType: 'Private Limited',
      industry: '',
      category: '',
      yearEstablished: new Date().getFullYear(),
      registeredAddress: '',
      city: '',
      state: '',
      cin: '',
      gstin: '',
      pan: '',
      annualRevenue: 0,
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      existingDebt: 0,
      monthlyDebtObligation: 0,
      employeesCount: 0,
      healthScore: 0, // Assessment Pending for new registrations
      termsAccepted: !!payload.termsAccepted,
      privacyAccepted: !!payload.privacyAccepted,
      dataConsentAccepted: !!payload.dataConsentAccepted,
      documents: [
        { id: 'bdoc-incorp', name: 'Certificate of Incorporation / Partnership Deed', category: 'Business Registration', status: 'Not Uploaded' },
        { id: 'bdoc-pan', name: 'Entity PAN Card', category: 'Tax', status: 'Not Uploaded' },
        { id: 'bdoc-gst', name: 'GST Registration Certificate', category: 'GST', status: 'Not Uploaded' },
        { id: 'bdoc-bank', name: 'Last 12 Months Bank Statements', category: 'Banking', status: 'Not Uploaded' }
      ]
    };

    const completion = calculateBorrowerProfileCompletion(initialBorrowerProfile);
    initialBorrowerProfile.profileCompletion = completion.totalPercentage;
    initialBorrowerProfile.visibilityStatus = completion.visibilityStatus;
    initialBorrowerProfile.profileStatus = completion.statusBadge;

    const newUser: User = {
      id: `usr-bor-${Date.now()}`,
      username: cleanUsername,
      name: payload.authorizedName.trim(),
      email: cleanEmail,
      role: 'borrower',
      createdAt: new Date().toISOString().split('T')[0],
      borrowerProfile: initialBorrowerProfile
    };

    // Create corresponding Business record in mock backend - initialized as PRIVATE and INCOMPLETE!
    mockDatabase.saveBusiness({
      id: businessId,
      name: payload.authorizedName.trim() ? `${payload.authorizedName.trim()}'s Enterprise` : 'New Business Enterprise',
      legalEntity: 'Private Limited',
      industry: 'Pending Information',
      category: 'Pending Information',
      location: 'To be specified',
      city: 'Pending',
      state: 'Pending',
      gstin: '',
      cin: '',
      pan: '',
      yearEstablished: new Date().getFullYear(),
      employeesCount: 0,
      annualRevenue: 0,
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      existingDebt: 0,
      monthlyDebtObligation: 0,
      healthScore: 0,
      verificationStatus: 'Not Started',
      visibilityStatus: 'PRIVATE',
      profileStatus: 'INCOMPLETE',
      profileCompletion: initialBorrowerProfile.profileCompletion,
      ownerUserId: newUser.id,
      ownerName: payload.authorizedName.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    });

    mockDatabase.saveUser(newUser, payload.password);
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  public updateLenderProfile(userId: string, data: Partial<LenderProfile>): User | null {
    const updated = mockDatabase.updateLenderProfile(userId, data);
    if (updated) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(updated));
      return updated;
    }
    return null;
  }

  public updateBorrowerProfile(userId: string, data: Partial<BorrowerProfile>): User | null {
    const updated = mockDatabase.updateBorrowerProfile(userId, data);
    if (updated) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(updated));
      return updated;
    }
    return null;
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}

export const authService = new AuthService();

