import {
  FinancingOpportunity,
  BusinessTrustHealthScore,
  DependencyAssessment,
  RiskItem,
  MonitoringEvent,
  BusinessDocument,
  ActivePortfolioPosition,
  PlatformAlert
} from '../types';
import { mockDatabase } from './mockDatabase';
import { authService } from './authService';

class MockDataService {
  public async getOpportunities(): Promise<FinancingOpportunity[]> {
    return mockDatabase.getFinancingRequests();
  }

  public getOpportunitiesSync(): FinancingOpportunity[] {
    return mockDatabase.getFinancingRequests();
  }

  public async getOpportunityById(id: string): Promise<FinancingOpportunity | undefined> {
    return mockDatabase.getFinancingRequestById(id) || mockDatabase.getFinancingRequests()[0];
  }

  public getOpportunityByIdSync(id: string): FinancingOpportunity | undefined {
    return mockDatabase.getFinancingRequestById(id) || mockDatabase.getFinancingRequests()[0];
  }

  public async getBusinessTrustScore(businessId?: string): Promise<BusinessTrustHealthScore> {
    return mockDatabase.getHealthScore(businessId);
  }

  public getBusinessTrustScoreSync(businessId?: string): BusinessTrustHealthScore {
    return mockDatabase.getHealthScore(businessId);
  }

  public async getDependencyAssessment(businessId?: string): Promise<DependencyAssessment> {
    return mockDatabase.getDependencyAssessment(businessId);
  }

  public getDependencyAssessmentSync(businessId?: string): DependencyAssessment {
    return mockDatabase.getDependencyAssessment(businessId);
  }

  public async getRiskItems(businessId?: string): Promise<RiskItem[]> {
    return mockDatabase.getRiskAssessment(businessId);
  }

  public getRiskItemsSync(businessId?: string): RiskItem[] {
    return mockDatabase.getRiskAssessment(businessId);
  }

  public async getMonitoringEvents(businessId?: string): Promise<MonitoringEvent[]> {
    return mockDatabase.getMonitoringEvents(businessId);
  }

  public getMonitoringEventsSync(businessId?: string): MonitoringEvent[] {
    return mockDatabase.getMonitoringEvents(businessId);
  }

  public getActivePositions(lenderId?: string): ActivePortfolioPosition[] {
    // If lenderId is provided, filter by it. If not, try current logged-in user if lender.
    if (lenderId) {
      return mockDatabase.getPortfolioPositions(lenderId);
    }
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.role === 'lender') {
      return mockDatabase.getPortfolioPositions(currentUser.id);
    }
    return mockDatabase.getPortfolioPositions();
  }

  public getActivePortfolio(lenderId?: string): ActivePortfolioPosition[] {
    return this.getActivePositions(lenderId);
  }

  public getMonitoringAlerts(): PlatformAlert[] {
    return mockDatabase.getAlerts();
  }

  public getAlerts(): PlatformAlert[] {
    return mockDatabase.getAlerts();
  }

  public resolveAlert(id: string): void {
    mockDatabase.markAlertAsRead(id);
  }

  public markAlertAsRead(id: string): void {
    mockDatabase.markAlertAsRead(id);
  }

  public getDocuments(businessId?: string): BusinessDocument[] {
    return mockDatabase.getDocuments(businessId);
  }

  public addDocument(doc: Partial<BusinessDocument>, businessId: string = 'opp-001'): BusinessDocument {
    const newDoc: BusinessDocument = {
      id: `doc-${Date.now()}`,
      name: doc.name || 'Uploaded Financial Statement.pdf',
      category: doc.category || 'Supporting Documents',
      fileSize: doc.fileSize || '2.1 MB',
      uploadedDate: 'Just now',
      status: 'Pending',
      verifiedBy: 'Verification Diligence Queue'
    };
    mockDatabase.addDocument(businessId, newDoc);
    return newDoc;
  }

  public addFinancingCommitment(position: {
    opportunityId: string;
    businessName: string;
    industry: string;
    amount: number;
    preferredDownsideTolerance: number;
    tenureMonths: number;
    expectedReturnRate: number;
  }): ActivePortfolioPosition {
    const currentUser = authService.getCurrentUser();
    const lenderId = currentUser?.id || 'usr-len-default';

    const newPos: ActivePortfolioPosition = {
      id: `pos-${Date.now()}`,
      lenderId,
      businessId: position.opportunityId,
      businessName: position.businessName,
      industry: position.industry,
      financedAmount: position.amount,
      preferredDownsideTolerance: position.preferredDownsideTolerance,
      expectedReturnRate: position.expectedReturnRate,
      startDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      tenureMonths: position.tenureMonths,
      remainingMonths: position.tenureMonths,
      healthScore: 88,
      riskLevel: 'Moderate',
      status: 'Active',
      totalRepaid: 0,
      nextPaymentDate: '15th Next Month',
      nextPaymentAmount: Math.round((position.amount * (1 + (position.expectedReturnRate / 100))) / position.tenureMonths),
      nextReviewDate: 'In 30 Days'
    };

    mockDatabase.addPortfolioPosition(newPos);

    // Update lender user profile if exists
    if (currentUser && currentUser.lenderProfile) {
      currentUser.lenderProfile.activeFinancing = (currentUser.lenderProfile.activeFinancing || 0) + position.amount;
      currentUser.lenderProfile.totalExposure = currentUser.lenderProfile.activeFinancing;
      if (currentUser.lenderProfile.availableCapital >= position.amount) {
        currentUser.lenderProfile.availableCapital -= position.amount;
      }
      mockDatabase.saveUser(currentUser, 'UNCHANGED');
      localStorage.setItem('codevest_auth_session', JSON.stringify(currentUser));
    }

    // Add alert about new financing commitment
    mockDatabase.addAlert({
      id: `alt-${Date.now()}`,
      title: `Financing Commitment Confirmed: ${position.businessName}`,
      businessName: position.businessName,
      businessId: position.opportunityId,
      message: `Financing facility of ₹${(position.amount / 100000).toFixed(2)} Lakh active. Telemetry monitoring commenced.`,
      category: 'Information',
      timestamp: 'Just now',
      isRead: false
    });

    return newPos;
  }
}

export const mockDataService = new MockDataService();
