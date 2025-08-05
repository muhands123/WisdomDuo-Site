// ============ إعدادات النموذج ============ //
const FORM_ID = "1FAIpQLSd67IldHl6-unSyGjmGrAE4k1X7Q0b-jMFCQ8rPWz9TRY9B3g";
const QUESTION_ID = "2071403553";

// ============ الدوال الرئيسية ============ //
async function submitQuestion() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim();
    
    if (!question) {
        showResponse("❗ الرجاء كتابة سؤال قبل الإرسال", "error");
        return;
    }

    showLoading();
    
    try {
        // المحاولة الأولى: إرسال عبر Proxy
        await sendViaProxy(question);
        
        // عرض النتيجة
        showSuccessResponse();
        questionInput.value = "";
        
    } catch (firstError) {
        console.error("المحاولة الأولى فشلت:", firstError);
        try {
            // المحاولة الثانية: إرسال مباشر
            await sendDirect(question);
            showSuccessResponse();
            questionInput.value = "";
            
        } catch (secondError) {
            console.error("المحاولة الثانية فشلت:", secondError);
            showResponse(`
                فشل الإرسال بسبب قيود الشبكة.<br>
                جرب:<br>
                1. استخدام VPN<br>
                2. تحديث الصفحة<br>
                3. المحاولة لاحقاً
            `, "error");
        }
    }
}

// ============ طرق الإرسال ============ //
async function sendViaProxy(question) {
    const proxies = [
        "https://cors-anywhere.herokuapp.com/",
        "https://proxy.cors.sh/",
        "https://api.allorigins.win/raw?url="
    ];
    
    const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const formData = `entry.${QUESTION_ID}=${encodeURIComponent(question)}`;
    
    // تجربة جميع Proxies المتاحة
    for (const proxy of proxies) {
        try {
            const response = await fetch(proxy + formUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: formData,
                timeout: 5000
            });
            
            if (response.ok) return;
        } catch (e) {
            console.log(`Proxy ${proxy} فشل:`, e);
        }
    }
    
    throw new Error("جميع Proxies فشلت");
}

async function sendDirect(question) {
    const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const formData = `entry.${QUESTION_ID}=${encodeURIComponent(question)}`;
    
    await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });
}

// ============ عرض النتائج ============ //
function showLoading() {
    document.getElementById('logicalAnswer').innerHTML = `
        <div class="loading">
            <h3>🌐 جاري الاتصال بالخوادم...</h3>
            <div class="loader"></div>
            <p>هذه العملية قد تستغرق بضع ثواني</p>
        </div>
    `;
    document.getElementById('poeticAnswer').innerHTML = "";
}

function showSuccessResponse() {
    document.getElementById('logicalAnswer').innerHTML = `
        <h3>🤖 تحليل DeepSeek-R1:</h3>
        <p>"تم استلام سؤالك بنجاح! جاري تحضير التحليل الكامل..."</p>
        <p class="small">(هذه إجابة تجريبية، جرب سؤالاً مختلفاً)</p>
    `;
    
    document.getElementById('poeticAnswer').innerHTML = `
        <h3>🌹 تأمل Qwen:</h3>
        <p>"الحكمة تبدأ بالسؤال، وترتقي بالتفكر"</p>
    `;
}

function showResponse(message, type) {
    const answerDiv = document.getElementById('logicalAnswer');
    
    if (type === "error") {
        answerDiv.innerHTML = `
            <div class="error">
                <h3>❌ حدث خطأ</h3>
                <p>${message}</p>
            </div>
        `;
        document.getElementById('poeticAnswer').innerHTML = "";
    }
}

// ============ تفعيل الأحداث ============ //
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitQuestion);
    
    document.getElementById('userQuestion').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitQuestion();
    });
});
