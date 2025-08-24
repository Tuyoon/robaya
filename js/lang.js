// Language management system
class LanguageManager {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = null;
    this.gameTranslations = null;
    this.supportedLanguages = ['en', 'ru'];
  }

  // Detect user's preferred language
  detectLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('robayaLanguage');
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
      const shortLang = browserLang.split('-')[0];
      if (this.supportedLanguages.includes(shortLang)) {
        return shortLang;
      }
    }

    // Default to English
    return 'en';
  }

  // Set language and update everything
  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error('🚫 Unsupported language:', lang);
      return;
    }

    console.log('🔄 Setting language to:', lang);
    this.currentLanguage = lang;
    localStorage.setItem('robayaLanguage', lang);
    
    this.updatePageLanguage();
    this.updateContent();
    this.updateLanguageSwitcherDisplay();
  }

  // Update HTML lang attribute
  updatePageLanguage() {
    document.documentElement.lang = this.currentLanguage;
    console.log('🌐 Updated HTML lang to:', this.currentLanguage);
  }

  // Update all content on the page
  updateContent() {
    console.log('📝 Updating content for language:', this.currentLanguage);
    
    // Try to get translations from game-specific file first
    let translations = this.gameTranslations || this.translations;
    
    if (!translations) {
      console.error('🚫 No translations available');
      return;
    }

    const currentLangTranslations = translations[this.currentLanguage];
    if (!currentLangTranslations) {
      console.error('🚫 No translations for language:', this.currentLanguage);
      return;
    }

    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' && element.type === 'placeholder') {
          element.placeholder = translation;
        } else if (element.tagName === 'IMG') {
          element.alt = translation;
        } else if (element.tagName === 'TITLE') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
        console.log('✅ Updated element:', key, '→', translation);
      } else {
        console.warn('⚠️ No translation found for key:', key);
      }
      
      // Handle data-i18n-title attribute
      const titleKey = element.getAttribute('data-i18n-title');
      if (titleKey) {
        const titleTranslation = this.getTranslation(titleKey);
        if (titleTranslation) {
          element.title = titleTranslation;
          console.log('✅ Updated title for element:', titleKey, '→', titleTranslation);
        }
      }
    });
  }

  // Get translation for a specific key
  getTranslation(key) {
    // Try game-specific translations first
    if (this.gameTranslations && this.gameTranslations[this.currentLanguage]) {
      const gameTranslation = this.gameTranslations[this.currentLanguage][key];
      if (gameTranslation) {
        return gameTranslation;
      }
    }

    // Fall back to global translations
    if (this.translations && this.translations[this.currentLanguage]) {
      const globalTranslation = this.translations[this.currentLanguage][key];
      if (globalTranslation) {
        return globalTranslation;
      }
    }

    return null;
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Check if language is supported
  isLanguageSupported(lang) {
    return this.supportedLanguages.includes(lang);
  }

  // Get list of supported languages
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }

  // Initialize the language manager
  async init() {
    console.log('🚀 Initializing LanguageManager...');
    
    // Check if we're on a game page first
    const isGamePage = window.location.pathname.includes('/games/');
    
    if (isGamePage) {
      // On game page - wait for game translations
      await this.waitForGameTranslations();
    } else {
      // On main page - wait for global translations
      await this.waitForGlobalTranslations();
    }
    
    // Set initial language
    const detectedLang = this.detectLanguage();
    this.setLanguage(detectedLang);
    
    // Setup language switchers
    this.setupLanguageSwitchers();
    
    console.log('✅ LanguageManager initialized successfully');
  }

  // Wait for game-specific translations to be available
  waitForGameTranslations() {
    return new Promise((resolve) => {
      const checkGameTranslations = () => {
        // Try to detect game name and check if translations are loaded
        const gameName = window.location.pathname.split('/games/')[1]?.split('/')[0];
        if (gameName) {
          const gameTranslationKey = `${gameName}Translations`;
          if (window[gameTranslationKey]) {
            console.log('📚 Game translations loaded for:', gameName);
            this.gameTranslations = window[gameTranslationKey];
            resolve();
            return;
          }
        }
        
        console.log('⏳ Waiting for game translations...');
        setTimeout(checkGameTranslations, 100);
      };
      checkGameTranslations();
    });
  }

  // Wait for global translations to be available
  waitForGlobalTranslations() {
    return new Promise((resolve) => {
      const checkTranslations = () => {
        if (window.translations) {
          console.log('📚 Global translations loaded');
          this.translations = window.translations;
          resolve();
        } else {
          console.log('⏳ Waiting for global translations...');
          setTimeout(checkTranslations, 100);
        }
      };
      checkTranslations();
    });
  }

  // Setup language switcher event listeners
  setupLanguageSwitchers() {
    const switchers = document.querySelectorAll('.lang-switch a[data-lang]');
    switchers.forEach(switcher => {
      switcher.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = switcher.getAttribute('data-lang');
        console.log('🔄 Language switcher clicked:', lang);
        this.setLanguage(lang);
      });
    });
    console.log('🔧 Language switchers setup complete');
  }

  // Update language switcher display
  updateLanguageSwitcherDisplay() {
    const switchers = document.querySelectorAll('.lang-switch a[data-lang]');
    switchers.forEach(switcher => {
      const lang = switcher.getAttribute('data-lang');
      if (lang === this.currentLanguage) {
        switcher.classList.add('active');
      } else {
        switcher.classList.remove('active');
      }
    });
    console.log('🎨 Updated language switcher display');
  }
}

// Create global instance
window.langManager = new LanguageManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM loaded, initializing LanguageManager...');
  window.langManager.init();
});

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageManager;
}


