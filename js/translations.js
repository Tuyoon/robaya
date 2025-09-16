// Global translations object
window.translations = {
  en: {
    // Main page
    pageTitle: "Mobile Games & Apps",
    mainTitle: "Welcome",
    mainSubtitle: "Discover amazing mobile games and applications",
    gamesTitle: "Our Games & Apps",
    gamesSubtitle: "Choose from our collection of entertaining and useful applications",
    
    // Sudoku game
    sudokuTitle: "Sudoku",
    sudokuDescription: "Brain training puzzle game with multiple difficulty levels",
    sudokuFeatures: "Features: Multiple levels, Daily challenges, Progress tracking",
    sudokuDownload: "Download on App Store",
    
    // Hwatu game
    hwatuTitle: "Hwatu",
    hwatuDescription: "Classic Korean card game with traditional designs",
    hwatuFeatures: "Features: Traditional cards, Multiple modes, Cultural experience",
    
    // Board Game Assistant
    boardGameAssistantTitle: "Board Game Assistant",
    boardGameAssistantDescription: "Your digital companion for tabletop gaming",
    boardGameAssistantFeatures: "Features: Team creation, Score tracking, Randomizer, Coin flip, Dice roll, Game mode with history, Timer, Calculator and etc.",
    
    // Coming Soon
    comingSoonTitle: "Coming Soon",
    
    // Common
    viewDetails: "View Details →",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    email: "rtat.store@gmail.com",
    home: "Home"
  },
  
  ru: {
    // Main page
    pageTitle: "Мобильные игры и приложения",
    mainTitle: "Добро пожаловать",
    mainSubtitle: "Откройте для себя удивительные мобильные игры и приложения",
    gamesTitle: "Наши игры и приложения",
    gamesSubtitle: "Выберите из нашей коллекции развлекательных и полезных приложений",
    
    // Sudoku game
    sudokuTitle: "Судоку",
    sudokuDescription: "Игра-головоломка для тренировки мозга с несколькими уровнями сложности",
    sudokuFeatures: "Особенности: Несколько уровней, Ежедневные задания, Отслеживание прогресса",
    sudokuDownload: "Скачать в App Store",
    
    // Hwatu game
    hwatuTitle: "Хато",
    hwatuDescription: "Классическая корейская карточная игра с традиционными дизайнами",
    hwatuFeatures: "Особенности: Традиционные карты, Несколько режимов, Культурный опыт",
    
    // Board Game Assistant
    boardGameAssistantTitle: "Ассистент настольных игр",
    boardGameAssistantDescription: "Ваш цифровой помощник для настольных игр",
    boardGameAssistantFeatures: "Особенности: Создание команд, Подсчет очков, Рандомайзер, Бросок монетки, Бросок кубиков, Режим игры с историей, Таймер, Калькулятор и др.",
    
    // Coming Soon
    comingSoonTitle: "Скоро",
    
    // Common
    viewDetails: "Подробнее →",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    email: "rtat.store@gmail.com",
    home: "Главная"
  }
};

// Also export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.translations;
}
