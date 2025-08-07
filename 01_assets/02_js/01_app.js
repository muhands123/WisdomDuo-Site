import HabitsSystem from './02_modules/01_habitsSystem.js';
import TitlesSystem from './02_modules/02_titlesSystem.js';

class App {
  static init() {
    this.habits = new HabitsSystem();
    this.titles = new TitlesSystem();
    console.log("تم تحميل التطبيق بنجاح!");
  }

  static switchLang(lang) {
    document.body.setAttribute('lang', lang);
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
}

document.addEventListener('DOMContentLoaded', () => App.init());
