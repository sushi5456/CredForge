import { mockDatabase } from './mockDatabase';
import { MonitoringEvent, PlatformAlert } from '../types';

class MonitoringService {
  public getEvents(businessId?: string): MonitoringEvent[] {
    return mockDatabase.getMonitoringEvents(businessId);
  }

  public getAlerts(): PlatformAlert[] {
    return mockDatabase.getAlerts();
  }

  public resolveAlert(id: string): void {
    mockDatabase.markAlertAsRead(id);
  }

  public createAlert(alert: PlatformAlert): void {
    mockDatabase.addAlert(alert);
  }
}

export const monitoringService = new MonitoringService();
