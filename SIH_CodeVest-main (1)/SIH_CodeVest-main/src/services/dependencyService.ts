import { mockDatabase } from './mockDatabase';
import { DependencyAssessment } from '../types';

class DependencyService {
  public getDependencyAssessment(businessId?: string): DependencyAssessment {
    return mockDatabase.getDependencyAssessment(businessId);
  }
}

export const dependencyService = new DependencyService();
