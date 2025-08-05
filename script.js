const FORM_ID = "1FAIpQLSd67IldHl6-unSyGjmGrAE4k1X7Q0b-jMFCQ8rPWz9TRY9B3g";
const QUESTION_ID = "2071403553";

async function submitQuestion() {
  const question = document.getElementById('userQuestion').value.trim();
  
  if (!question) {
    showMessage("الرجاء كتابة سؤال أولاً!", "error");
    return;
  }

  showLoading();

  try {
    // إرسال السؤال إلى Google Forms
    await sendToGoogleForms(question);
    
    // عرض رسالة نجاح
    showMessage("تم استلام سؤالك بنجاح!", "success");
    
    // مسح السؤال بعد الإرسال
    document.getElementById('userQuestion').value = "";
    
    // هنا سنضيف لاحقاً استجابة من الذكاء الاصطناعي
    simulateAIResponse();

  } catch (error) {
    console.error("Error:", error);
    showMessage("حدث خطأ في الإرسال!", "error");
  }
}

async function sendToGoogleForms(question) {
  const formData = new URLSearchParams();
  formData.append(`entry.${QUESTION_ID}`, question);
  
  await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  });
}

function simulateAIResponse() {
  setTimeout(() => {
    document.getElementById('logicalAnswer').innerHTML = `
      <h3>📊 تحليل DeepSeek-R1:</h3>
      <p>هذه إجابة ذكية ستأتي من الذكاء الاصطناعي قريباً</p>
    `;
    document.getElementById('poeticAnswer').innerHTML = `
      <h3>🌌 تأمل Qwen:</h3>
      <p>هذا النص سيكون تأملاً وجودياً من Qwen</p>
    `;
  }, 2000);
}

function showLoading() {
  document.getElementById('logicalAnswer').innerHTML = `
    <div class="loading">
      <h3>⚡ جاري المعالجة...</h3>
      <div class="loader"></div>
    </div>
  `;
}

function showMessage(msg, type) {
  const color = type === "error" ? "#ff4b4b" : "#4b3bff";
  document.getElementById('poeticAnswer').innerHTML = `
    <p style="color: ${color}; padding: 10px; background: #f8f8f8; border-radius: 5px;">
      ${msg}
    </p>
  `;
}
