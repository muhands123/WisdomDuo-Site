import { FORM_ID, QUESTION_ID } from './config.js';

// تحسينات إضافية
const MAX_RETRIES = 3;
let retryCount = 0;

async function handleSubmit() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();
    
    if (!question) {
        showError("❗ يرجى كتابة سؤال واضح");
        questionInput.focus();
        return;
    }

    showLoading();
    disableForm();

    try {
        await retrySubmission(question);
        showSuccessResponse(question);
        questionInput.value = "";
    } catch (error) {
        console.error("فشل الإرسال بعد المحاولات:", error);
        showError("🔧 جرب استخدام VPN أو تحديث الصفحة");
    } finally {
        enableForm();
    }
}

async function retrySubmission(question) {
    while (retryCount < MAX_RETRIES) {
        try {
            await submitWithFallback(question);
            return;
        } catch (err) {
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
    }
    throw new Error("فشل بعد 3 محاولات");
}

async function submitWithFallback(question) {
    // المحاولة الأولى: إرسال مباشر
    try {
        await sendToGoogleFormsDirect(question);
        return;
    } catch (directError) {
        console.log("المحاولة المباشرة فشلت، جرب Proxy...");
    }
    
    // المحاولة الثانية: استخدام Proxy
    await sendViaProxy(question);
}

// ... (أبقى الدوال الأخرى كما هي مع إضافة دوال disableForm/enableForm)
