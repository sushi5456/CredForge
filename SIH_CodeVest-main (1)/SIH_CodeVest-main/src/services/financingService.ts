import { mockDatabase } from './mockDatabase';
import { FinancingOpportunity, ActivePortfolioPosition } from '../types';

class FinancingService {
  public getOpportunities(): FinancingOpportunity[] {
    return mockDatabase.getFinancingRequests();
  }

  public getOpportunityById(id: string): FinancingOpportunity | undefined {
    return mockDatabase.getFinancingRequestById(id);
  }

  public submitFinancingRequest(request: FinancingOpportunity): void {
    mockDatabase.addFinancingRequest(request);
  }

  public getPortfolioPositions(lenderId?: string): ActivePortfolioPosition[] {
    return mockDatabase.getPortfolioPositions(lenderId);
  }

  public addCommitment(position: ActivePortfolioPosition): void {
    mockDatabase.addPortfolioPosition(position);
  }
}

export const financingService = new FinancingService();
