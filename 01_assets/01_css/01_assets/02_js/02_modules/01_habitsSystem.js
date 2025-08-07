export default class HabitsSystem {
  constructor() {
    this.habits = JSON.parse(localStorage.getItem('habits')) || [];
    this.init();
  }

  init() {
    this.renderHabits();
    document.getElementById('add-habit-btn').addEventListener('click', () => {
      const input = document.getElementById('habit-input');
      this.addHabit(input.value.trim());
      input.value = '';
    });
  }

  addHabit(habitText) {
    if (!habitText) return;
    
    const newHabit = {
      id: Date.now(),
      text: habitText,
      done: false
    };
    
    this.habits.push(newHabit);
    this.saveHabits();
    this.renderHabits();
  }
}
