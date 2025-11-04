import React, { useState, useEffect } from 'react';
import { QuickSyncService } from '../../services/quickSync';
import './CloudSync.css';

interface CloudSyncProps {
  onSyncComplete?: () => void;
}

export const CloudSync: React.FC<CloudSyncProps> = ({ onSyncComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    lastImport: string | null;
    hasUrlData: boolean;
  }>({ lastImport: null, hasUrlData: false });
  const [showExportData, setShowExportData] = useState(false);
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');
  const [syncURL, setSyncURL] = useState('');

  useEffect(() => {
    updateSyncStatus();
    checkForURLSync();
  }, []);

  const updateSyncStatus = () => {
    const status = QuickSyncService.getSyncStatus();
    setSyncStatus(status);
  };

  const checkForURLSync = () => {
    if (QuickSyncService.hasSyncDataInURL()) {
      if (confirm('🔄 Sync data detected in URL! Import this data to sync with another device?')) {
        const success = QuickSyncService.importFromURL();
        if (success) {
          alert('✅ Data successfully synced from URL!');
          updateSyncStatus();
          onSyncComplete?.();
        } else {
          alert('❌ Failed to import sync data from URL.');
        }
      }
    }
  };

  const handleGenerateSyncURL = () => {
    setIsLoading(true);
    try {
      const url = QuickSyncService.generateSyncURL();
      setSyncURL(url);
      alert('✅ Sync URL generated! Copy and open on your other device.');
    } catch (error) {
      alert('❌ Error generating sync URL: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySyncURL = () => {
    if (syncURL) {
      navigator.clipboard.writeText(syncURL);
      alert('✅ Sync URL copied to clipboard! Paste and open on your other device.');
    }
  };

  const handleExportData = () => {
    const data = QuickSyncService.exportData();
    setExportData(data);
    setShowExportData(true);
  };

  const handleImportData = () => {
    if (!importData.trim()) {
      alert('❌ Masukkan data untuk diimport!');
      return;
    }

    if (!confirm('⚠️ Ini akan mengganti semua data lokal. Lanjutkan?')) {
      return;
    }

    const success = QuickSyncService.importData(importData);
    if (success) {
      alert('✅ Data berhasil diimport! Silakan refresh halaman.');
      window.location.reload();
    } else {
      alert('❌ Gagal import data. Periksa format data.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData);
    alert('✅ Data disalin ke clipboard!');
  };

  return (
    <div className="cloud-sync">
      <div className="sync-header">
        <h3>🔄 Device Synchronization</h3>
        <div className="sync-status">
          <div className="status-indicator online">
            🟢 Ready to Sync
          </div>
          {syncStatus.lastImport && (
            <div className="last-sync">
              Last import: {new Date(syncStatus.lastImport).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      <div className="sync-actions">
        <button
          onClick={handleGenerateSyncURL}
          disabled={isLoading}
          className="sync-btn primary"
        >
          {isLoading ? '⏳ Generating...' : '🔗 Generate Sync URL'}
        </button>

        {syncURL && (
          <button
            onClick={handleCopySyncURL}
            className="sync-btn secondary"
          >
            📋 Copy Sync URL
          </button>
        )}
      </div>

      {syncURL && (
        <div className="sync-url-display">
          <h4>🔗 Sync URL Generated</h4>
          <p>Copy this URL and open it on your other device to sync data:</p>
          <div className="url-container">
            <input
              type="text"
              value={syncURL}
              readOnly
              className="sync-url-input"
            />
            <button onClick={handleCopySyncURL} className="copy-url-btn">
              📋 Copy
            </button>
          </div>
        </div>
      )}

      <div className="manual-sync">
        <h4>📱 Manual Device Sync</h4>
        <p>For syncing data between devices manually:</p>
        
        <div className="manual-actions">
          <button onClick={handleExportData} className="export-btn">
            📤 Export Data
          </button>
          
          <div className="import-section">
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste exported data here..."
              className="import-textarea"
            />
            <button onClick={handleImportData} className="import-btn">
              📥 Import Data
            </button>
          </div>
        </div>
      </div>

      {showExportData && (
        <div className="export-modal">
          <div className="export-content">
            <h4>📤 Exported Data</h4>
            <p>Copy this data and paste it on your other device:</p>
            <textarea
              value={exportData}
              readOnly
              className="export-data"
            />
            <div className="export-actions">
              <button onClick={copyToClipboard} className="copy-btn">
                📋 Copy to Clipboard
              </button>
              <button onClick={() => setShowExportData(false)} className="close-btn">
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};