function setLang(lang) {
  localStorage.setItem('preferredLang', lang);
}

function redirectToPreferredLang(defaultLang = 'en') {
  const lang = localStorage.getItem('preferredLang') || defaultLang;
  const current = window.location.pathname.split('/')[1];
  if (current !== lang) {
    window.location.href = '/' + lang + '/index.html';
  }
}
