// Device synchronization utilities
import { localStorageService } from '../services/localStorage';

export interface SyncData {
  userCredentials: Array<{ username: string; password: string }>;
  users: any[];
  deviceInfo: {
    deviceType: string;
    timestamp: Date;
    deviceId: string;
  };
}

export class DeviceSyncService {
  // Generate sync data for export
  static generateSyncData(): SyncData {
    const deviceInfo = localStorageService.getDeviceInfo();
    
    return {
      userCredentials: localStorageService.getUserCredentials(),
      users: localStorageService.getUsers(),
      deviceInfo: {
        deviceType: deviceInfo.deviceType,
        timestamp: new Date(),
        deviceId: deviceInfo.deviceId
      }
    };
  }

  // Generate QR code data string
  static generateQRData(): string {
    const syncData = this.generateSyncData();
    return JSON.stringify(syncData);
  }

  // Import sync data from another device
  static importSyncData(syncDataString: string): boolean {
    try {
      const syncData: SyncData = JSON.parse(syncDataString);
      
      // Validate data structure
      if (!syncData.userCredentials || !Array.isArray(syncData.userCredentials)) {
        throw new Error('Invalid sync data format');
      }

      // Import user credentials
      syncData.userCredentials.forEach(cred => {
        localStorageService.addUserCredential(cred.username, cred.password);
      });

      // Import users if they don't exist
      const existingUsers = localStorageService.getUsers();
      syncData.users.forEach(user => {
        const exists = existingUsers.find(u => u.username === user.username);
        if (!exists) {
          localStorageService.addUser(user);
        }
      });

      return true;
    } catch (error) {
      console.error('Error importing sync data:', error);
      return false;
    }
  }

  // Generate simple sync code (6-digit code for manual entry)
  static generateSyncCode(): string {
    const credentials = localStorageService.getUserCredentials();
    const adminCred = credentials.find(c => c.username === 'admin');
    
    if (adminCred) {
      // Generate a simple hash of the password for sync code
      const hash = this.simpleHash(adminCred.password);
      return hash.toString().padStart(6, '0').slice(-6);
    }
    
    return '000000';
  }

  // Simple hash function for sync codes
  private static simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Verify sync code matches current admin password
  static verifySyncCode(code: string): boolean {
    const expectedCode = this.generateSyncCode();
    return code === expectedCode;
  }
}