import { CONFIG } from './config.js';

class FormSubmitter {
  constructor() {
    this.retryCount = 0;
    this.MAX_RETRIES = 3;
  }

  async submit(question) {
    try {
      await this._sendWithIframe(question);
    } catch (error) {
      console.warn("الطريقة الأولى فشلت، جرب الطريقة الاحتياطية...");
      await this._sendWithPixel(question);
    }
  }

  _sendWithIframe(question) {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = this._buildFormUrl(question);
      iframe.onload = resolve;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 5000);
    });
  }

  _sendWithPixel(question) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this._buildFormUrl(question);
      img.onload = resolve;
    });
  }

  _buildFormUrl(question) {
    const params = new URLSearchParams();
    params.set(CONFIG.FIELD_IDS.QUESTION, question);
    params.set(CONFIG.FIELD_IDS.TIMESTAMP, new Date().toISOString());
    
    return `https://docs.google.com/forms/d/e/${CONFIG.FORM_ID}/formResponse?${params.toString()}`;
  }
}

// الاستخدام
document.getElementById('submitBtn').addEventListener('click', async () => {
  const question = document.getElementById('userQuestion').value.trim();
  
  if (!question) {
    showError("❗ يرجى إدخال سؤال صحيح");
    return;
  }

  showLoading();
  
  try {
    const submitter = new FormSubmitter();
    await submitter.submit(question);
    showSuccess(question);
  } catch (error) {
    showError("⚠️ فشل الإرسال. يرجى المحاولة لاحقاً");
  }
});
