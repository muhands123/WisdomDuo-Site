import { FORM_ID, QUESTION_ID } from './config.js';

// تحسينات جديدة:
document.getElementById('userQuestion').focus(); // تركيز تلقائي على حقل السؤال

async function handleSubmit() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();
    
    // تحقق محسن من السؤال الفارغ
    if (!question) {
        showError("❗ يرجى كتابة سؤال قبل الإرسال");
        questionInput.focus();
        return;
    }

    showLoading();
    
    try {
        // 1. محاولة الإرسال بدون Proxy أولاً
        await sendToGoogleFormsDirect(question);
        
        // 2. عرض إجابة تجريبية محسنة
        showResponse(
            `📊 <b>تحليل DeepSeek-R1:</b><br>"${question}" سؤال عميق. جاري تحليل الجوانب الفلسفية...`,
            `🌹 <b>تأمل Qwen:</b><br>"في أعماق السؤال تكمن الإجابة.. ربما نحتاج فقط إلى التأمل"`
        );
        
        questionInput.value = ""; // مسح السؤال بعد الإرسال
        
    } catch (error) {
        console.error("Error:", error);
        showError("🔄 فشل الإرسال. جرب تحديث الصفحة أو المحاولة لاحقاً");
    }
}

// إرسال مباشر (بدون Proxy)
async function sendToGoogleFormsDirect(question) {
    const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const formData = new FormData();
    formData.append(`entry.${QUESTION_ID}`, question);

    await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });
}

// ... (ابقى دوال showLoading و showResponse و showError كما هي)
