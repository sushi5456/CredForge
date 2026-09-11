import {
  User,
  FinancingOpportunity,
  BusinessTrustHealthScore,
  DependencyAssessment,
  RiskItem,
  MonitoringEvent,
  BusinessDocument,
  ActivePortfolioPosition,
  PlatformAlert,
  BorrowerProfile,
  LenderProfile,
  BorrowerVisibilityStatus
} from '../types';
import {
  MOCK_OPPORTUNITIES,
  MOCK_BUSINESS_TRUST_SCORE,
  MOCK_DEPENDENCY_ASSESSMENT,
  MOCK_RISK_ITEMS,
  MOCK_MONITORING_EVENTS,
  MOCK_BUSINESS_DOCUMENTS,
  MOCK_PLATFORM_ALERTS
} from '../data/mockData';
import { calculateLenderProfileCompletion, calculateBorrowerProfileCompletion } from '../utils/profileCompletion';

const STORAGE_KEY_DB = 'codevest_mock_db_v3';

export interface StoredUserEntry {
  user: User;
  passwordHash: string; // Internal prototype credential representation
}

export interface BusinessRecord {
  id: string;
  name: string;
  legalEntity: string;
  industry: string;
  category: string;
  location: string;
  city: string;
  state: string;
  gstin: string;
  cin: string;
  pan: string;
  yearEstablished: number;
  employeesCount: number;
  annualRevenue: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  existingDebt: number;
  monthlyDebtObligation: number;
  healthScore: number;
  verificationStatus: 'Verified' | 'Pending' | 'In Review' | 'Action Required' | 'Not Started';
  visibilityStatus: BorrowerVisibilityStatus;
  profileStatus: 'INCOMPLETE' | 'UNDER_REVIEW' | 'COMPLETE';
  profileCompletion: number;
  requestedAmount?: number;
  fundedAmount?: number;
  ownerUserId?: string;
  ownerName?: string;
  createdAt: string;
}

export interface MockDatabaseState {
  users: Record<string, StoredUserEntry>;
  lenderProfiles: Record<string, LenderProfile>;
  borrowerProfiles: Record<string, BorrowerProfile>;
  businesses: Record<string, BusinessRecord>;
  financingRequests: FinancingOpportunity[];
  healthScores: Record<string, BusinessTrustHealthScore>;
  riskAssessments: Record<string, RiskItem[]>;
  monitoringEvents: Record<string, MonitoringEvent[]>;
  dependencyAssessments: Record<string, DependencyAssessment>;
  alerts: PlatformAlert[];
  notifications: Array<{ id: string; userId?: string; title: string; message: string; date: string; read: boolean }>;
  documents: Record<string, BusinessDocument[]>;
  portfolioPositions: ActivePortfolioPosition[];
}

function getInitialDatabaseState(): MockDatabaseState {
  // 1. Initial Internal Admin (Never exposed in public UI)
  const initialUsers: Record<string, StoredUserEntry> = {
    admin: {
      user: {
        id: 'usr-adm-001',
        username: 'admin',
        email: 'admin@codevest.internal',
        name: 'Vikramaditya Rao',
        role: 'admin',
        createdAt: '2025-01-01',
        adminProfile: {
          department: 'Platform Oversight & Risk Intelligence',
          permissions: ['ALL_PERMISSIONS', 'RISK_OVERRIDE', 'KYC_APPROVE', 'AUDIT_VIEW'],
          lastLogin: 'Today'
        }
      },
      passwordHash: 'CodeVestAdmin2026!'
    }
  };

  // 2. Fictional Marketplace Businesses
  const initialBusinesses: Record<string, BusinessRecord> = {
    'opp-001': {
      id: 'opp-001',
      name: 'ABC Manufacturing Pvt Ltd',
      legalEntity: 'Private Limited',
      industry: 'Manufacturing',
      category: 'Auto Components & Precision Engineering',
      location: 'Coimbatore, Tamil Nadu',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      gstin: '33AABCA4589K1Z5',
      cin: 'U28112TZ2016PTC027891',
      pan: 'AABCA4589K',
      yearEstablished: 2016,
      employeesCount: 68,
      annualRevenue: 28400000,
      monthlyRevenue: 2366000,
      monthlyExpenses: 1890000,
      existingDebt: 3200000,
      monthlyDebtObligation: 145000,
      healthScore: 86,
      verificationStatus: 'Verified',
      visibilityStatus: 'DISCOVERABLE',
      profileStatus: 'COMPLETE',
      profileCompletion: 100,
      ownerName: 'K. Srinivasan',
      createdAt: '2025-06-01'
    },
    'opp-002': {
      id: 'opp-002',
      name: 'GreenGrid Foods Ltd',
      legalEntity: 'Public Limited',
      industry: 'Food Processing',
      category: 'Organic Grain Export & Packaging',
      location: 'Nashik, Maharashtra',
      city: 'Nashik',
      state: 'Maharashtra',
      gstin: '27AABCG1298L1Z9',
      cin: 'L15122MH2014PLC254189',
      pan: 'AABCG1298L',
      yearEstablished: 2014,
      employeesCount: 94,
      annualRevenue: 48000000,
      monthlyRevenue: 4000000,
      monthlyExpenses: 3240000,
      existingDebt: 4500000,
      monthlyDebtObligation: 185000,
      healthScore: 89,
      verificationStatus: 'Verified',
      visibilityStatus: 'DISCOVERABLE',
      profileStatus: 'COMPLETE',
      profileCompletion: 100,
      ownerName: 'M. Deshmukh',
      createdAt: '2025-06-15'
    },
    'opp-003': {
      id: 'opp-003',
      name: 'Nova Components Pvt Ltd',
      legalEntity: 'Private Limited',
      industry: 'Electronics',
      category: 'IoT Sensor Assembly & Hardware',
      location: 'Bengaluru, Karnataka',
      city: 'Bengaluru',
      state: 'Karnataka',
      gstin: '29AABCN8871P1Z2',
      cin: 'U31909KA2019PTC128764',
      pan: 'AABCN8871P',
      yearEstablished: 2019,
      employeesCount: 52,
      annualRevenue: 34500000,
      monthlyRevenue: 2875000,
      monthlyExpenses: 2210000,
      existingDebt: 2100000,
      monthlyDebtObligation: 95000,
      healthScore: 91,
      verificationStatus: 'Verified',
      visibilityStatus: 'DISCOVERABLE',
      profileStatus: 'COMPLETE',
      profileCompletion: 100,
      ownerName: 'R. Kulkarni',
      createdAt: '2025-07-01'
    },
    'opp-004': {
      id: 'opp-004',
      name: 'UrbanBuild Solutions LLP',
      legalEntity: 'LLP',
      industry: 'Construction Infrastructure',
      category: 'Prefab Modular Structural Elements',
      location: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana',
      gstin: '36AAEFU4421R1Z8',
      cin: 'AAH-4421',
      pan: 'AAEFU4421R',
      yearEstablished: 2018,
      employeesCount: 42,
      annualRevenue: 22000000,
      monthlyRevenue: 1833000,
      monthlyExpenses: 1480000,
      existingDebt: 3800000,
      monthlyDebtObligation: 160000,
      healthScore: 83,
      verificationStatus: 'Verified',
      visibilityStatus: 'DISCOVERABLE',
      profileStatus: 'COMPLETE',
      profileCompletion: 100,
      ownerName: 'V. Reddy',
      createdAt: '2025-07-10'
    },
    'opp-005': {
      id: 'opp-005',
      name: 'Veda Agro Industries Pvt Ltd',
      legalEntity: 'Private Limited',
      industry: 'Agri-Tech',
      category: 'Precision Drip Irrigation Equipment',
      location: 'Indore, Madhya Pradesh',
      city: 'Indore',
      state: 'Madhya Pradesh',
      gstin: '23AABCV5512Q1Z4',
      cin: 'U01409MP2017PTC043891',
      pan: 'AABCV5512Q',
      yearEstablished: 2017,
      employeesCount: 61,
      annualRevenue: 31000000,
      monthlyRevenue: 2583000,
      monthlyExpenses: 2040000,
      existingDebt: 2900000,
      monthlyDebtObligation: 130000,
      healthScore: 87,
      verificationStatus: 'Verified',
      visibilityStatus: 'DISCOVERABLE',
      profileStatus: 'COMPLETE',
      profileCompletion: 100,
      ownerName: 'A. Sharma',
      createdAt: '2025-07-20'
    }
  };

  // 3. Fictional Financing Requests
  const initialFinancingRequests: FinancingOpportunity[] = [...MOCK_OPPORTUNITIES];

  // 4. Initial Health Scores
  const initialHealthScores: Record<string, BusinessTrustHealthScore> = {
    'opp-001': { ...MOCK_BUSINESS_TRUST_SCORE, overallScore: 86 },
    'opp-002': { ...MOCK_BUSINESS_TRUST_SCORE, overallScore: 89 },
    'opp-003': { ...MOCK_BUSINESS_TRUST_SCORE, overallScore: 91 },
    'opp-004': { ...MOCK_BUSINESS_TRUST_SCORE, overallScore: 83 },
    'opp-005': { ...MOCK_BUSINESS_TRUST_SCORE, overallScore: 87 }
  };

  // 5. Initial Risk Assessments
  const initialRiskAssessments: Record<string, RiskItem[]> = {
    'opp-001': MOCK_RISK_ITEMS,
    'opp-002': MOCK_RISK_ITEMS,
    'opp-003': MOCK_RISK_ITEMS,
    'opp-004': MOCK_RISK_ITEMS,
    'opp-005': MOCK_RISK_ITEMS
  };

  // 6. Initial Dependency Assessments
  const initialDependencyAssessments: Record<string, DependencyAssessment> = {
    'opp-001': MOCK_DEPENDENCY_ASSESSMENT,
    'opp-002': MOCK_DEPENDENCY_ASSESSMENT,
    'opp-003': MOCK_DEPENDENCY_ASSESSMENT,
    'opp-004': MOCK_DEPENDENCY_ASSESSMENT,
    'opp-005': MOCK_DEPENDENCY_ASSESSMENT
  };

  // 7. Initial Monitoring Events
  const initialMonitoringEvents: Record<string, MonitoringEvent[]> = {
    'opp-001': MOCK_MONITORING_EVENTS,
    'opp-002': MOCK_MONITORING_EVENTS,
    'opp-003': MOCK_MONITORING_EVENTS,
    'opp-004': MOCK_MONITORING_EVENTS,
    'opp-005': MOCK_MONITORING_EVENTS
  };

  // 8. Documents
  const initialDocuments: Record<string, BusinessDocument[]> = {
    'opp-001': MOCK_BUSINESS_DOCUMENTS,
    'opp-002': MOCK_BUSINESS_DOCUMENTS,
    'opp-003': MOCK_BUSINESS_DOCUMENTS,
    'opp-004': MOCK_BUSINESS_DOCUMENTS,
    'opp-005': MOCK_BUSINESS_DOCUMENTS
  };

  return {
    users: initialUsers,
    lenderProfiles: {},
    borrowerProfiles: {},
    businesses: initialBusinesses,
    financingRequests: initialFinancingRequests,
    healthScores: initialHealthScores,
    riskAssessments: initialRiskAssessments,
    monitoringEvents: initialMonitoringEvents,
    dependencyAssessments: initialDependencyAssessments,
    alerts: [...MOCK_PLATFORM_ALERTS],
    notifications: [],
    documents: initialDocuments,
    portfolioPositions: [] // Empty initially: new lenders start with 0 positions!
  };
}

class MockDatabaseService {
  private state: MockDatabaseState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): MockDatabaseState {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY_DB);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        // Ensure admin user exists
        if (!parsed.users || !parsed.users.admin) {
          const fresh = getInitialDatabaseState();
          parsed.users = { ...fresh.users, ...(parsed.users || {}) };
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse mock database, resetting to default', e);
    }
    const fresh = getInitialDatabaseState();
    this.persist(fresh);
    return fresh;
  }

  private persist(state: MockDatabaseState = this.state): void {
    try {
      localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist mock database', e);
    }
  }

  // ================= USERS & AUTH =================
  public getUsers(): User[] {
    return Object.values(this.state.users).map(entry => entry.user);
  }

  public getUserByUsernameOrEmail(identifier: string): StoredUserEntry | undefined {
    const clean = identifier.toLowerCase().trim();
    const entry = this.state.users[clean];
    if (entry) return entry;

    return Object.values(this.state.users).find(
      u => u.user?.email?.toLowerCase().trim() === clean || u.user?.username?.toLowerCase().trim() === clean
    );
  }

  public getUserById(id: string): User | undefined {
    const found = Object.values(this.state.users).find(u => u.user?.id === id);
    return found?.user;
  }

  public isUsernameTaken(username: string): boolean {
    const clean = username.toLowerCase().trim();
    return !!this.getUserByUsernameOrEmail(clean);
  }

  public isEmailTaken(email: string): boolean {
    const clean = email.toLowerCase().trim();
    return !!Object.values(this.state.users).find(u => u.user?.email?.toLowerCase().trim() === clean);
  }

  public saveUser(user: User, passwordHash: string): void {
    const cleanUsername = user.username.toLowerCase().trim();
    this.state.users[cleanUsername] = { user, passwordHash };
    if (user.lenderProfile) {
      this.state.lenderProfiles[user.id] = user.lenderProfile;
    }
    if (user.borrowerProfile) {
      this.state.borrowerProfiles[user.id] = user.borrowerProfile;
    }
    this.persist();
  }

  public updateLenderProfile(userId: string, partialProfile: Partial<LenderProfile>): User | undefined {
    const userEntry = Object.values(this.state.users).find(u => u.user.id === userId);
    if (!userEntry) return undefined;

    const current = userEntry.user.lenderProfile || {
      mobile: '',
      profileStatus: 'INCOMPLETE',
      eligibilityStatus: 'PROFILE_INCOMPLETE',
      profileCompletion: 0,
      kycStatus: 'Not Started',
      availableCapital: 0,
      activeFinancing: 0,
      totalExposure: 0,
      preferredDownsideTolerance: 20000,
      preferredCategories: [],
      preferredTenureMonths: 12,
      preferredReturnRange: '13% - 16% p.a.',
      riskPreference: 'Balanced'
    } as LenderProfile;

    const merged: LenderProfile = {
      ...current,
      ...partialProfile
    };

    const completion = calculateLenderProfileCompletion(merged);
    merged.profileCompletion = completion.totalPercentage;
    merged.eligibilityStatus = completion.eligibilityStatus;
    merged.profileStatus = completion.statusBadge;

    userEntry.user.lenderProfile = merged;
    this.state.lenderProfiles[userId] = merged;
    this.persist();
    return userEntry.user;
  }

  public updateBorrowerProfile(userId: string, partialProfile: Partial<BorrowerProfile>): User | undefined {
    const userEntry = Object.values(this.state.users).find(u => u.user.id === userId);
    if (!userEntry) return undefined;

    const current = userEntry.user.borrowerProfile || {
      authorizedPersonName: userEntry.user.name,
      designation: 'Managing Director',
      mobile: '',
      profileStatus: 'INCOMPLETE',
      verificationStatus: 'NOT_STARTED',
      visibilityStatus: 'PRIVATE',
      eligibilityStatus: 'PENDING',
      profileCompletion: 0,
      businessName: '',
      entityType: 'Private Limited',
      industry: 'Manufacturing',
      category: 'General',
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
      healthScore: 0
    } as BorrowerProfile;

    const merged: BorrowerProfile = {
      ...current,
      ...partialProfile
    };

    const completion = calculateBorrowerProfileCompletion(merged);
    merged.profileCompletion = completion.totalPercentage;
    merged.visibilityStatus = completion.visibilityStatus;
    merged.profileStatus = completion.statusBadge;
    merged.verificationStatus = completion.verificationStatus;

    userEntry.user.borrowerProfile = merged;
    this.state.borrowerProfiles[userId] = merged;

    // Synchronize corresponding BusinessRecord
    const biz = this.getBusinessByOwnerUserId(userId);
    if (biz) {
      biz.name = merged.businessName || biz.name;
      biz.legalEntity = merged.entityType || biz.legalEntity;
      biz.industry = merged.industry || biz.industry;
      biz.category = merged.category || biz.category;
      biz.city = merged.city || biz.city;
      biz.state = merged.state || biz.state;
      biz.location = `${merged.city || biz.city}, ${merged.state || biz.state}`;
      biz.gstin = merged.gstin || biz.gstin;
      biz.cin = merged.cin || biz.cin;
      biz.pan = merged.pan || biz.pan;
      biz.yearEstablished = merged.yearEstablished || biz.yearEstablished;
      biz.employeesCount = merged.employeesCount || biz.employeesCount;
      biz.annualRevenue = merged.annualRevenue || biz.annualRevenue;
      biz.monthlyRevenue = merged.monthlyRevenue || biz.monthlyRevenue;
      biz.monthlyExpenses = merged.monthlyExpenses || biz.monthlyExpenses;
      biz.existingDebt = merged.existingDebt || biz.existingDebt;
      biz.monthlyDebtObligation = merged.monthlyDebtObligation || biz.monthlyDebtObligation;
      if (merged.requestedAmount) biz.requestedAmount = merged.requestedAmount;
      biz.visibilityStatus = merged.visibilityStatus;
      biz.profileStatus = merged.profileStatus;
      biz.profileCompletion = merged.profileCompletion;
      biz.verificationStatus = (merged.verificationStatus === 'VERIFIED' ? 'Verified' : merged.verificationStatus === 'PENDING' ? 'Pending' : merged.verificationStatus === 'REQUIRES_ACTION' ? 'Action Required' : 'Not Started');
    }

    this.persist();
    return userEntry.user;
  }

  // ================= BUSINESSES =================
  public getBusinesses(): BusinessRecord[] {
    return Object.values(this.state.businesses);
  }

  public getBusinessById(id: string): BusinessRecord | undefined {
    return this.state.businesses[id];
  }

  public getBusinessByOwnerUserId(userId: string): BusinessRecord | undefined {
    return Object.values(this.state.businesses).find(b => b.ownerUserId === userId);
  }

  public saveBusiness(biz: BusinessRecord): void {
    this.state.businesses[biz.id] = biz;
    this.persist();
  }

  public updateBusinessVerification(businessId: string, status: 'Verified' | 'Pending' | 'In Review' | 'Action Required'): void {
    if (this.state.businesses[businessId]) {
      this.state.businesses[businessId].verificationStatus = status;
      // Also update linked borrower profile if any
      const biz = this.state.businesses[businessId];
      if (biz.ownerUserId) {
        const userEntry = Object.values(this.state.users).find(u => u.user.id === biz.ownerUserId);
        if (userEntry && userEntry.user.borrowerProfile) {
          userEntry.user.borrowerProfile.verificationStatus =
            status === 'Verified' ? 'VERIFIED' : status === 'Action Required' ? 'REQUIRES_ACTION' : 'PENDING';
        }
      }
      this.persist();
    }
  }

  // ================= FINANCING REQUESTS =================
  public getFinancingRequests(): FinancingOpportunity[] {
    return this.state.financingRequests.filter(req => {
      // Find matching business if linked
      const biz = this.state.businesses[req.id] || Object.values(this.state.businesses).find(b => b.name === req.businessName);
      if (biz) {
        // Must have visibilityStatus DISCOVERABLE and profileStatus COMPLETE
        return biz.visibilityStatus === 'DISCOVERABLE' && biz.profileStatus === 'COMPLETE';
      }
      return true;
    });
  }

  public getFinancingRequestById(id: string): FinancingOpportunity | undefined {
    return this.state.financingRequests.find(r => r.id === id);
  }

  public addFinancingRequest(request: FinancingOpportunity): void {
    this.state.financingRequests.unshift(request);
    this.persist();
  }

  // ================= HEALTH SCORES =================
  public getHealthScore(businessId?: string): BusinessTrustHealthScore {
    if (businessId && this.state.healthScores[businessId]) {
      return this.state.healthScores[businessId];
    }
    // Fallback to first available or default
    return this.state.healthScores['opp-001'] || MOCK_BUSINESS_TRUST_SCORE;
  }

  public setHealthScore(businessId: string, score: BusinessTrustHealthScore): void {
    this.state.healthScores[businessId] = score;
    this.persist();
  }

  // ================= RISK ASSESSMENTS =================
  public getRiskAssessment(businessId?: string): RiskItem[] {
    if (businessId && this.state.riskAssessments[businessId]) {
      return this.state.riskAssessments[businessId];
    }
    return this.state.riskAssessments['opp-001'] || MOCK_RISK_ITEMS;
  }

  // ================= DEPENDENCY ASSESSMENTS =================
  public getDependencyAssessment(businessId?: string): DependencyAssessment {
    if (businessId && this.state.dependencyAssessments[businessId]) {
      return this.state.dependencyAssessments[businessId];
    }
    return this.state.dependencyAssessments['opp-001'] || MOCK_DEPENDENCY_ASSESSMENT;
  }

  // ================= MONITORING EVENTS =================
  public getMonitoringEvents(businessId?: string): MonitoringEvent[] {
    if (businessId && this.state.monitoringEvents[businessId]) {
      return this.state.monitoringEvents[businessId];
    }
    return this.state.monitoringEvents['opp-001'] || MOCK_MONITORING_EVENTS;
  }

  // ================= ALERTS =================
  public getAlerts(): PlatformAlert[] {
    return [...this.state.alerts];
  }

  public markAlertAsRead(id: string): void {
    this.state.alerts = this.state.alerts.map(a => (a.id === id ? { ...a, isRead: true } : a));
    this.persist();
  }

  public addAlert(alert: PlatformAlert): void {
    this.state.alerts.unshift(alert);
    this.persist();
  }

  // ================= PORTFOLIO POSITIONS =================
  public getPortfolioPositions(lenderId?: string): ActivePortfolioPosition[] {
    if (lenderId) {
      return this.state.portfolioPositions.filter(p => p.lenderId === lenderId);
    }
    return [...this.state.portfolioPositions];
  }

  public addPortfolioPosition(position: ActivePortfolioPosition): void {
    this.state.portfolioPositions.unshift(position);
    this.persist();
  }

  // ================= DOCUMENTS =================
  public getDocuments(businessId?: string): BusinessDocument[] {
    if (businessId && this.state.documents[businessId]) {
      return [...this.state.documents[businessId]];
    }
    return [...MOCK_BUSINESS_DOCUMENTS];
  }

  public addDocument(businessId: string, doc: BusinessDocument): void {
    if (!this.state.documents[businessId]) {
      this.state.documents[businessId] = [];
    }
    this.state.documents[businessId].unshift(doc);
    this.persist();
  }
}

export const mockDatabase = new MockDatabaseService();
