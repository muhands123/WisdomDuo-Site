export default class TitlesSystem {
  constructor() {
    this.templates = {
      ar: [
        "كيف {topic} في 5 خطوات؟",
        "10 أسرار عن {topic}",
        "دليل {topic} الشامل"
      ],
      en: [
        "How to {topic} in 5 steps",
        "10 secrets about {topic}",
        "Complete guide to {topic}"
      ]
    };
  }

  generate(topic) {
    if (!topic) return null;
    
    const lang = document.body.getAttribute('lang');
    const randomTemplate = this.templates[lang][Math.floor(Math.random() * this.templates[lang].length)];
    return randomTemplate.replace('{topic}', topic);
  }
}
