// Theme management system
class ThemeManager {
  constructor() {
    this.currentTheme = 'system';
    this.supportedThemes = ['light', 'dark', 'system'];
    this.systemTheme = 'light';
    this.init();
  }

  // Initialize theme manager
  init() {
    this.detectSystemTheme();
    this.loadTheme();
    this.setupSystemThemeListener();
    this.applyTheme();
    console.log('🎨 ThemeManager initialized with automatic theme detection');
  }

  // Detect system theme
  detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.systemTheme = 'dark';
    } else {
      this.systemTheme = 'light';
    }
    console.log('🖥️ System theme detected:', this.systemTheme);
  }

  // Setup listener for system theme changes
  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.systemTheme = e.matches ? 'dark' : 'light';
        console.log('🔄 System theme changed to:', this.systemTheme);
        
        // Always apply the new system theme since we're in automatic mode
        this.applyTheme();
      });
    }
  }

  // Load theme from localStorage (always system for automatic mode)
  loadTheme() {
    // Always use system theme for automatic mode
    this.currentTheme = 'system';
    console.log('📖 Loaded theme: system (automatic)');
  }

  // Save theme to localStorage
  saveTheme() {
    localStorage.setItem('robayaTheme', this.currentTheme);
    console.log('💾 Saved theme:', this.currentTheme);
  }

  // Apply current theme to document
  applyTheme() {
    // Always use system theme for automatic mode
    const effectiveTheme = this.systemTheme;
    
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    console.log('🎨 Applied theme:', effectiveTheme, '(system detected)');
  }

  // Get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Get effective theme (actual applied theme)
  getEffectiveTheme() {
    return this.systemTheme;
  }

  // Check if theme is supported
  isThemeSupported(theme) {
    return this.supportedThemes.includes(theme);
  }

  // Get list of supported themes
  getSupportedThemes() {
    return [...this.supportedThemes];
  }

  // Get system theme
  getSystemTheme() {
    return this.systemTheme;
  }
}

// Create global instance
window.themeManager = new ThemeManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM loaded, initializing ThemeManager...');
  // ThemeManager is already initialized in constructor
});

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
