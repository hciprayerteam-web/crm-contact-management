// Force Favicon Refresh Script
// Run this in browser console to force favicon update

(function() {
    // Remove all existing favicon links
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(link => link.remove());
    
    // Add new favicon with timestamp to bypass cache
    const timestamp = new Date().getTime();
    
    // Primary favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.sizes = '48x48';
    favicon.href = `/favicon-32x32.png?t=${timestamp}`;
    document.head.appendChild(favicon);
    
    // Shortcut icon
    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.href = `/favicon-32x32.png?t=${timestamp}`;
    document.head.appendChild(shortcut);
    
    // Apple touch icon
    const apple = document.createElement('link');
    apple.rel = 'apple-touch-icon';
    apple.sizes = '48x48';
    apple.href = `/favicon-32x32.png?t=${timestamp}`;
    document.head.appendChild(apple);
    
    console.log('Favicon refreshed with timestamp:', timestamp);
    
    // Force page reload after 1 second
    setTimeout(() => {
        window.location.reload(true);
    }, 1000);
})();