// Quick Sync Service - Simple cross-device data synchronization
export interface SyncData {
  users: any[];
  userCredentials: Array<{ username: string; password: string }>;
  contacts: any[];
  timestamp: string;
}

export class QuickSyncService {
  // Generate sync URL with compressed data
  static generateSyncURL(): string {
    const data: SyncData = {
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      userCredentials: JSON.parse(localStorage.getItem('user_credentials') || '[]'),
      contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
      timestamp: new Date().toISOString()
    };

    // Compress data to base64
    const compressed = btoa(JSON.stringify(data));
    const baseURL = window.location.origin + window.location.pathname;
    
    return `${baseURL}?sync=${compressed}`;
  }

  // Import data from URL parameter
  static importFromURL(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    const syncData = urlParams.get('sync');
    
    if (!syncData) return false;

    try {
      const decompressed = atob(syncData);
      const data: SyncData = JSON.parse(decompressed);
      
      // Validate data
      if (!data.users || !data.userCredentials) {
        throw new Error('Invalid sync data');
      }

      // Import data
      localStorage.setItem('users', JSON.stringify(data.users));
      localStorage.setItem('user_credentials', JSON.stringify(data.userCredentials));
      localStorage.setItem('contacts', JSON.stringify(data.contacts));
      localStorage.setItem('sync_imported_at', new Date().toISOString());

      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return true;
    } catch (error) {
      console.error('Error importing sync data:', error);
      return false;
    }
  }

  // Generate QR code data
  static generateQRData(): string {
    return this.generateSyncURL();
  }

  // Export data as JSON string
  static exportData(): string {
    const data: SyncData = {
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      userCredentials: JSON.parse(localStorage.getItem('user_credentials') || '[]'),
      contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
      timestamp: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }

  // Import data from JSON string
  static importData(jsonString: string): boolean {
    try {
      const data: SyncData = JSON.parse(jsonString);
      
      // Validate data
      if (!data.users || !data.userCredentials) {
        throw new Error('Invalid data format');
      }

      // Import data
      localStorage.setItem('users', JSON.stringify(data.users));
      localStorage.setItem('user_credentials', JSON.stringify(data.userCredentials));
      localStorage.setItem('contacts', JSON.stringify(data.contacts));
      localStorage.setItem('sync_imported_at', new Date().toISOString());

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Check if there's sync data in URL
  static hasSyncDataInURL(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('sync');
  }

  // Get sync status
  static getSyncStatus(): { lastImport: string | null; hasUrlData: boolean } {
    return {
      lastImport: localStorage.getItem('sync_imported_at'),
      hasUrlData: this.hasSyncDataInURL()
    };
  }
}