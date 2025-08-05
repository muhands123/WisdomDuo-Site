// إعدادات النموذج - استخدم هذه القيم كما هي
const FORM_ID = "1FAIpQLSd67IldHl6-unSyGjmGrAE4k1X7Q0b-jMFCQ8rPWz9TRY9B3g";
const QUESTION_ID = "2071403553";

async function submitQuestion() {
  const question = document.getElementById('userQuestion').value.trim();
  
  if (!question) {
    alert("⛔ الرجاء كتابة سؤال قبل الإرسال!");
    return;
  }

  try {
    // عرض حالة التحميل
    document.getElementById('logicalAnswer').innerHTML = `
      <div class="loading">
        <h3>📡 جاري إرسال سؤالك...</h3>
        <div class="loader"></div>
      </div>
    `;

    // إرسال البيانات إلى Google Forms
    await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        [`entry.${QUESTION_ID}`]: question
      })
    });

    // رسالة النجاح
    document.getElementById('logicalAnswer').innerHTML = `
      <h3>✅ تم استلام سؤالك بنجاح!</h3>
      <p>سيصلك الرد قريباً...</p>
    `;
    
    // مسح حقل الإدخال
    document.getElementById('userQuestion').value = "";

  } catch (error) {
    document.getElementById('logicalAnswer').innerHTML = `
      <h3>❌ حدث خطأ!</h3>
      <p>جرب مرة أخرى أو تحدث إلى الدعم</p>
    `;
    console.error("Error:", error);
  }
}
