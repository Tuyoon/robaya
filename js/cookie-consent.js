// Cookie Consent Management System
class CookieConsentManager {
  constructor() {
    this.consentGiven = false;
    this.cookieName = 'robayaCookieConsent';
    this.expirationDays = 365;
    this.init();
  }

  // Initialize cookie consent manager
  init() {
    console.log('🍪 Initializing CookieConsentManager...');
    
    // Check if consent has already been given
    this.consentGiven = this.hasConsent();
    
    if (!this.consentGiven) {
      // Wait for DOM to be ready and translations to be loaded
      this.waitForSetup().then(() => {
        this.showBanner();
      });
    } else {
      console.log('✅ Cookie consent already given');
    }
  }

  // Wait for DOM and language manager to be ready
  waitForSetup() {
    return new Promise((resolve) => {
      const checkSetup = () => {
        if (document.readyState === 'complete' && window.langManager) {
          console.log('✅ Setup complete');
          resolve();
        } else {
          console.log('⏳ Waiting for setup...');
          setTimeout(checkSetup, 100);
        }
      };
      checkSetup();
    });
  }

  // Check if user has already given consent (or rejected)
  hasConsent() {
    const consentCookie = this.getCookie(this.cookieName);
    // Баннер не показывается если пользователь уже принял или отклонил cookies
    return consentCookie === 'accepted' || consentCookie === 'rejected';
  }

  // Show cookie consent banner
  showBanner() {
    console.log('🍪 Showing cookie consent banner');
    
    // Определяем путь к странице Privacy Policy (относительно текущей страницы)
    const privacyPath = this.getPrivacyPath();
    
    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'alert');
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-message">
          <div class="cookie-icon">🍪</div>
          <div class="cookie-text">
            <p class="cookie-title" data-i18n="cookieTitle">We use cookies</p>
            <p class="cookie-description" data-i18n="cookieDescription">This website uses cookies to improve your experience. By clicking 'Accept All', you agree to our use of cookies.</p>
          </div>
        </div>
        <div class="cookie-consent-buttons">
          <button class="cookie-btn cookie-btn-accept" data-i18n="cookieAccept">Accept All</button>
          <button class="cookie-btn cookie-btn-reject" data-i18n="cookieReject">Reject All</button>
          <button class="cookie-btn cookie-btn-info" data-i18n="cookieLearnMore" data-privacy-path="${privacyPath}">Learn More</button>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(banner);

    // Setup event listeners
    this.setupEventListeners();
    
    // Update translations with retries
    this.updateTranslations();
    
    // Retry translations after a short delay to ensure langManager is ready
    setTimeout(() => {
      this.updateTranslations();
    }, 200);
    
    // Retry translations one more time
    setTimeout(() => {
      this.updateTranslations();
    }, 500);
  }

  // Get relative path to privacy policy
  getPrivacyPath() {
    const path = window.location.pathname;
    // If we're on a game page (in /games/ folder)
    if (path.includes('/games/')) {
      return '../../privacy.html';
    }
    // Otherwise we're on the main site
    return 'privacy.html';
  }

  // Setup event listeners for buttons
  setupEventListeners() {
    const acceptBtn = document.querySelector('.cookie-btn-accept');
    const rejectBtn = document.querySelector('.cookie-btn-reject');
    const infoBtn = document.querySelector('.cookie-btn-info');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptCookies());
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.rejectCookies());
    }

    if (infoBtn) {
      infoBtn.addEventListener('click', () => {
        const privacyPath = infoBtn.getAttribute('data-privacy-path');
        window.location.href = privacyPath;
      });
    }

    console.log('🔧 Cookie consent event listeners setup complete');
  }

  // Accept cookies
  acceptCookies() {
    console.log('✅ User accepted cookies');
    this.saveConsent('accepted');
    this.hideBanner();
    this.consentGiven = true;
    
    // Show success message briefly
    this.showSuccessMessage('cookieAcceptedMessage');
  }

  // Reject cookies
  rejectCookies() {
    console.log('❌ User rejected cookies');
    this.saveConsent('rejected');
    this.hideBanner();
    this.consentGiven = true;
    
    // Show success message briefly
    this.showSuccessMessage('cookieRejectedMessage');
  }

  // Hide the banner with animation
  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(100%)';
      
      setTimeout(() => {
        banner.remove();
        console.log('🍪 Cookie banner removed');
      }, 300);
    }
  }

  // Show success message
  showSuccessMessage(messageKey) {
    const message = window.langManager?.getTranslation(messageKey) || 'Thank you!';
    
    // Create temporary success message
    const toast = document.createElement('div');
    toast.className = 'cookie-toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Save consent to cookie
  saveConsent(value) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.expirationDays);
    
    const cookieValue = `${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    document.cookie = `${this.cookieName}=${cookieValue}`;
    
    console.log('💾 Cookie consent saved:', value);
  }

  // Get cookie value
  getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  // Update translations when language changes
  updateTranslations() {
    const banner = document.getElementById('cookie-consent-banner');
    if (!banner) {
      console.warn('⚠️ Banner not found for translations');
      return;
    }
    
    console.log('🔄 Updating translations...');
    
    // Update all elements with data-i18n attribute
    const elements = banner.querySelectorAll('[data-i18n]');
    console.log(`📋 Found ${elements.length} elements to translate`);
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      let translation = null;
      
      // Try to get translation from langManager
      if (window.langManager && window.langManager.getTranslation) {
        translation = window.langManager.getTranslation(key);
        console.log(`🔍 Tried langManager for ${key}:`, translation);
      }
      
      // Try to get translation from global translations object
      if (!translation && window.translations) {
        const currentLang = window.langManager?.getCurrentLanguage() || 'en';
        console.log(`🔍 Checking translations[${currentLang}][${key}]`);
        if (window.translations[currentLang] && window.translations[currentLang][key]) {
          translation = window.translations[currentLang][key];
          console.log(`📍 Found in translations object:`, translation);
        }
      }
      
      // Apply translation or keep fallback text
      if (translation) {
        element.textContent = translation;
        console.log('✅ Updated translation:', key, '→', translation);
      } else {
        console.warn('⚠️ No translation found for:', key, 'Keeping fallback:', element.textContent);
      }
    });
  }

  // Check if consent was given
  isConsentGiven() {
    return this.consentGiven;
  }

  // Reset consent (for testing purposes)
  resetConsent() {
    console.log('🔄 Resetting cookie consent');
    document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.consentGiven = false;
    this.showBanner();
  }
}

// Create global instance
window.cookieConsentManager = new CookieConsentManager();

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CookieConsentManager;
}
