// ============== إعدادات النموذج ============== //
const FORM_ID = "ABC123DEF"; // استبدل بهذا - الجزء بعد forms.gle/
const QUESTION_ID = "1234567890"; // استبدل بهذا - من استعلامات التحرير

// ============== الدوال الرئيسية ============== //
async function submitQuestion() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();
    
    // التحقق من إدخال السؤال
    if (!question) {
        showError("الرجاء كتابة سؤال أولاً!");
        return;
    }

    // عرض حالة التحميل
    showLoadingState();
    
    try {
        // إرسال البيانات إلى Google Forms
        await sendToGoogleForms(question);
        
        // عرض رسالة النجاح
        showSuccessMessage();
        
        // مسح حقل الإدخال بعد الإرسال
        questionInput.value = "";
        
    } catch (error) {
        console.error("Error:", error);
        showError("حدث خطأ أثناء الإرسال. الرجاء المحاولة لاحقاً.");
    }
}

// ============== دوال المساعدة ============== //
async function sendToGoogleForms(question) {
    const formData = new URLSearchParams();
    formData.append(`entry.${QUESTION_ID}`, question);
    
    await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });
}

function showLoadingState() {
    document.getElementById('logicalAnswer').innerHTML = `
        <div class="loading">
            <h3>📊 جاري معالجة سؤالك...</h3>
            <p>DeepSeek-R1 يقوم بتحليل السؤال</p>
            <div class="loader"></div>
        </div>
    `;
    
    document.getElementById('poeticAnswer').innerHTML = `
        <div class="loading">
            <h3>🌌 Qwen يعد تأملاً فريداً...</h3>
            <div class="loader"></div>
        </div>
    `;
}

function showSuccessMessage() {
    document.getElementById('logicalAnswer').innerHTML = `
        <h3>✅ تمت المعالجة!</h3>
        <p>إجابة DeepSeek-R1 المنطقية ستظهر هنا قريباً</p>
    `;
    
    document.getElementById('poeticAnswer').innerHTML = `
        <h3>🌸 التأمل جاهز!</h3>
        <p>إجابة Qwen الشعرية ستظهر هنا قريباً</p>
    `;
}

function showError(message) {
    const answerDivs = document.querySelectorAll('.answer-box');
    answerDivs.forEach(div => {
        div.innerHTML = `<p class="error">${message}</p>`;
    });
}

// ============== تهيئة الأحداث ============== //
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitQuestion);
});
