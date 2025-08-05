// config.js
const CONFIG = {
  FORM_ID: "1FAIpQLSd67IldHl6-unSyGjmGrAE4k1X7Q0b-jMFCQ8rPWz9TRY9B3g",
  QUESTION_ID: "2071403553"
};

// script.js
document.getElementById('submitBtn').addEventListener('click', async () => {
  const question = document.getElementById('userQuestion').value.trim();
  
  if (!question) {
    showError("❗ اكتب سؤالاً واضحاً");
    return;
  }

  showLoading();
  
  try {
    // الطريقة الأكثر موثوقية حالياً
    await sendQuestion(question);
    showResponse(question);
  } catch (error) {
    console.error("Error:", error);
    showError("🔄 حدث خطأ غير متوقع. جرب مرة أخرى");
  }
});

// ========== التقنيات الجديدة ========== //
async function sendQuestion(question) {
  // التقنية 1: استخدام iframe خفي
  await sendViaHiddenIframe(question);
  
  // التقنية 2: fallback إلى Image Pixel
  await sendViaImagePixel(question);
}

function sendViaHiddenIframe(question) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `https://docs.google.com/forms/d/e/${CONFIG.FORM_ID}/viewform?` +
                 `entry.${CONFIG.QUESTION_ID}=${encodeURIComponent(question)}` +
                 `&submit=Submit`;
    iframe.onload = resolve;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 3000);
  });
}

function showResponse(question) {
  document.getElementById('logicalAnswer').innerHTML = `
    <h3>🤖 تحليل DeepSeek-R1:</h3>
    <p>"تم استلام سؤالك '<strong>${question}</strong>' بنجاح!"</p>
    <p class="small">(الإجابات الذكية الكاملة ستكون متاحة بعد الترقية القادمة)</p>
  `;
  
  document.getElementById('poeticAnswer').innerHTML = `
    <h3>🌹 تأمل Qwen:</h3>
    <p>"كل سؤال هو بداية رحلة بحث..."</p>
  `;
}

// ... (أبقى دوال showLoading و showError كما هي)
