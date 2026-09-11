import { mockDatabase } from './mockDatabase';
import { RiskItem, BusinessTrustHealthScore } from '../types';

class RiskService {
  public getRiskItems(businessId?: string): RiskItem[] {
    return mockDatabase.getRiskAssessment(businessId);
  }

  public getHealthScore(businessId?: string): BusinessTrustHealthScore {
    return mockDatabase.getHealthScore(businessId);
  }

  public updateHealthScore(businessId: string, score: BusinessTrustHealthScore): void {
    mockDatabase.setHealthScore(businessId, score);
  }
}

export const riskService = new RiskService();
