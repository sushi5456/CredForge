import { mockDatabase, BusinessRecord } from './mockDatabase';

class BusinessService {
  public getBusinesses(): BusinessRecord[] {
    return mockDatabase.getBusinesses();
  }

  public getBusinessById(id: string): BusinessRecord | undefined {
    return mockDatabase.getBusinessById(id);
  }

  public getBusinessByOwnerUserId(userId: string): BusinessRecord | undefined {
    return mockDatabase.getBusinessByOwnerUserId(userId);
  }

  public saveBusiness(biz: BusinessRecord): void {
    mockDatabase.saveBusiness(biz);
  }

  public updateVerificationStatus(
    businessId: string,
    status: 'Verified' | 'Pending' | 'In Review' | 'Action Required'
  ): void {
    mockDatabase.updateBusinessVerification(businessId, status);
  }
}

export const businessService = new BusinessService();
