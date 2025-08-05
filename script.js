// ============== إعدادات النموذج ============== //
const FORM_ID = "1FAIpQLSd67IldHl6-unSyGjmGrAE4k1X7Q0b-jMFCQ8rPWz9TRY9B3g";
const QUESTION_ID = "2071403553";

// ============== الدوال الرئيسية ============== //
async function submitQuestion() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();
    
    // التحقق من إدخال السؤال
    if (!question) {
        showMessage("الرجاء كتابة سؤال أولاً!", "error");
        return;
    }

    // عرض حالة التحميل
    showLoadingState();
    
    try {
        // إرسال البيانات عبر Proxy
        await sendViaProxy(question);
        
        // عرض إجابات تجريبية (سيتم استبدالها بالإجابات الذكية لاحقاً)
        simulateAIResponse();
        
        // مسح حقل الإدخال بعد الإرسال
        questionInput.value = "";
        
    } catch (error) {
        console.error("Error:", error);
        showMessage("حدث خطأ في الإرسال. الرجاء المحاولة لاحقاً", "error");
    }
}

// ============== دوال المساعدة ============== //
async function sendViaProxy(question) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const formData = new URLSearchParams();
    formData.append(`entry.${QUESTION_ID}`, question);

    const response = await fetch(proxyUrl + formUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: formData
    });
    
    if (!response.ok) throw new Error("فشل الإرسال");
}

function simulateAIResponse() {
    document.getElementById('logicalAnswer').innerHTML = `
        <h3>🤖 تحليل DeepSeek-R1:</h3>
        <p>"هذا النموذج الأولي. الإجابات الذكية الحقيقية قريباً!"</p>
        <p class="small">(جرب تحديث الصفحة لمشاهدة تغييرات الكود الجديد)</p>
    `;
    
    document.getElementById('poeticAnswer').innerHTML = `
        <h3>🌹 تأمل Qwen:</h3>
        <p>"كل بداية تحتاج إلى صبر.. وشغف.. وإرادة"</p>
    `;
}

function showLoadingState() {
    document.getElementById('logicalAnswer').innerHTML = `
        <div class="loading">
            <h3>📡 جاري معالجة السؤال...</h3>
            <div class="loader"></div>
            <p>يتم الآن تحويل السؤال إلى خوادمنا</p>
        </div>
    `;
    
    document.getElementById('poeticAnswer').innerHTML = `
        <div class="loading">
            <h3>🧠 جاري توليد التأمل...</h3>
            <div class="loader"></div>
        </div>
    `;
}

function showMessage(message, type) {
    const color = type === "error" ? "#ff4b4b" : "#4b3bff";
    const answerDivs = document.querySelectorAll('.answer-box');
    
    answerDivs.forEach(div => {
        div.innerHTML = `
            <p style="color: ${color}; padding: 10px; 
               background: ${type === "error" ? "#ffecec" : "#f0f5ff"};
               border-radius: 5px;">
                ${message}
            </p>
        `;
    });
}

// ============== تهيئة الأحداث ============== //
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitQuestion);
    
    // تفعيل إرسال السؤال بالضغط على Enter
    document.getElementById('userQuestion').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitQuestion();
    });
});
