# Multi-Device Usage Guide - Hopeline Care CRM

## Understanding Device-Specific Data Storage

### How It Works
Hopeline Care CRM uses **localStorage** for data storage, which means:
- 📱 **Each device stores its own data** (mobile, tablet, desktop)
- 🔐 **Each browser maintains separate sessions** 
- 💾 **Data is not automatically synced between devices**
- 🆔 **User accounts are consistent but sessions are separate**

### Default Login Credentials
**Same credentials work on all devices:**
- **Admin Account**: `admin` / `admin123`
- **Editor Account**: `editor` / `editor123`

### What This Means for Users

#### ✅ Consistent Features
- Same login credentials across all devices
- Identical user interface and functionality
- Same user roles and permissions
- Consistent user experience

#### ⚠️ Device-Specific Data
- **Contacts**: Each device has its own contact list
- **Service records**: Stored separately per device
- **User settings**: Individual per device
- **Session data**: Not shared between devices

### Device Identification

#### Visual Indicators
- **Login page**: Shows current device type (Mobile/Desktop)
- **Navigation**: Displays device type in user info
- **Session info**: Device identifier in user profile

#### Device Types Detected
- 📱 **Mobile**: Smartphones, mobile browsers
- 💻 **Desktop**: Laptops, desktop computers, tablets in desktop mode

### Best Practices for Multi-Device Usage

#### 1. Choose a Primary Device
- Designate one device as your main CRM device
- Use it for most contact management tasks
- Keep the most up-to-date contact database there

#### 2. Data Export/Import (Available)
- Use **Export** feature to backup data from primary device
- **Import** data to secondary devices when needed
- Regular exports ensure data backup

#### 3. Understand Limitations
- Changes on one device won't appear on others automatically
- Each device needs separate data entry
- Service tracking is device-specific

### Troubleshooting Common Issues

#### "Different user data on mobile vs desktop"
**This is normal behavior!** Each device maintains its own localStorage.

**Solutions:**
1. **Accept separate sessions**: Use each device independently
2. **Export/Import**: Transfer data between devices manually
3. **Choose primary device**: Use one main device for CRM tasks

#### "Lost data when switching devices"
**Data isn't lost**, it's stored on the original device.

**Solutions:**
1. Return to the original device to access data
2. Use export feature before switching devices
3. Keep important data backed up via exports

#### "Can't see contacts from other device"
**This is expected behavior** with localStorage.

**Solutions:**
1. Export contacts from device A
2. Import contacts to device B
3. Or use each device for different purposes

### Advanced Usage Scenarios

#### Scenario 1: Office + Mobile Setup
- **Desktop**: Main contact database, detailed work
- **Mobile**: Quick contact lookup, field updates
- **Sync method**: Weekly export from desktop to mobile

#### Scenario 2: Team Usage
- **Each team member**: Uses their own device
- **Data sharing**: Via export/import features
- **Coordination**: Regular data consolidation meetings

#### Scenario 3: Backup Strategy
- **Primary device**: Main CRM operations
- **Secondary device**: Backup and emergency access
- **Process**: Regular exports for data backup

### Future Enhancements (Roadmap)

#### Planned Features
1. **QR Code Sync**: Quick data transfer between devices
2. **Export/Import improvements**: Easier data synchronization
3. **Cloud sync option**: Optional cloud-based data storage
4. **Device management**: Better multi-device coordination

#### Current Limitations
- No real-time sync between devices
- Manual data transfer required
- Session management is device-specific
- No cloud storage integration

### Technical Details

#### localStorage Scope
```
Domain: hopelinecare.hopechannel.id
Storage: Per browser, per device
Capacity: ~5-10MB per domain
Persistence: Until manually cleared
```

#### Data Structure
```
User Session: Device-specific
Contacts: Device-specific  
Settings: Device-specific
Service Records: Device-specific
```

### Support and Help

#### If You Need Help
1. **Check this guide** for common scenarios
2. **Use export/import** for data transfer needs
3. **Contact support** for technical issues
4. **Report bugs** via GitHub issues

#### Best Support Practices
- Specify which device you're using
- Mention if issue occurs on multiple devices
- Include export data if relevant
- Describe your multi-device setup

---

## Quick Reference

### ✅ What Works Across Devices
- Login credentials (admin/admin123, editor/editor123)
- User interface and features
- User roles and permissions
- Application functionality

### ❌ What Doesn't Sync
- Contact databases
- Service records
- User sessions
- Application settings
- Data changes

### 🔧 Solutions Available
- Export/Import functionality
- Device type indicators
- Session information display
- Clear multi-device messaging

**Remember**: This is a feature, not a bug! localStorage provides fast, reliable, offline-capable data storage for each device independently.