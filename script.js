import { FORM_ID, QUESTION_ID, API_URL } from './config.js';

// ============ متغيرات عامة ============ //
let isProcessing = false;

// ============ دوال المساعدة ============ //
function showLoading() {
    document.getElementById('logicalAnswer').innerHTML = `
        <div class="loading">
            <h3>⚡ جاري المعالجة</h3>
            <div class="loader"></div>
            <p>قد يستغرق هذا بضع ثواني</p>
        </div>
    `;
    document.getElementById('poeticAnswer').innerHTML = "";
}

function showError(message) {
    document.getElementById('logicalAnswer').innerHTML = `
        <div class="error">
            <h3>❌ حدث خطأ</h3>
            <p>${message}</p>
        </div>
    `;
    document.getElementById('poeticAnswer').innerHTML = "";
}

function showResponse(logical, poetic) {
    document.getElementById('logicalAnswer').innerHTML = logical;
    document.getElementById('poeticAnswer').innerHTML = poetic;
}

async function saveQuestionToForms(question) {
    const proxies = [
        "https://corsproxy.io/?",
        "https://api.allorigins.win/raw?url=",
        "https://thingproxy.freeboard.io/fetch/"
    ];

    const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
    const formData = `entry.${QUESTION_ID}=${encodeURIComponent(question)}`;

    for (const proxy of proxies) {
        try {
            const response = await fetch(`${proxy}${formUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData,
                timeout: 10000
            });
            if (response.ok) return true;
        } catch (e) {
            console.error(`Proxy ${proxy} failed:`, e);
        }
    }
    throw new Error("فشل في حفظ السؤال");
}

// ============ الدالة الرئيسية ============ //
async function handleSubmit() {
    if (isProcessing) return;
    
    const question = document.getElementById('userQuestion').value.trim();
    
    if (!question) {
        showError("الرجاء كتابة سؤال قبل الإرسال");
        return;
    }

    isProcessing = true;
    showLoading();

    try {
        // 1. حفظ السؤال في Google Forms
        await saveQuestionToForms(question);
        
        // 2. محاكاة الإجابة من الذكاء الاصطناعي (ستستبدل بالاتصال الحقيقي لاحقاً)
        const logicalAnswer = `
            <h3>🤖 تحليل DeepSeek-R1:</h3>
            <p>"لقد تلقينا سؤالك عن <strong>${question}</strong> وسنقدم الإجابة الكاملة قريباً"</p>
            <p class="small">(هذه إجابة تجريبية، جرب سؤالاً مختلفاً)</p>
        `;
        
        const poeticAnswer = `
            <h3>🌹 تأمل Qwen:</h3>
            <p>"وراء كل سؤال حكاية، وتحت كل كلمة أسرار"</p>
            <p>"${question}... بداية رحلة بحث عن المعنى"</p>
        `;
        
        // 3. عرض النتيجة
        showResponse(logicalAnswer, poeticAnswer);
        
    } catch (error) {
        console.error("Error:", error);
        showError("حدث خطأ في الإرسال. الرجاء المحاولة لاحقاً");
    } finally {
        isProcessing = false;
    }
}

// ============ تفعيل الأحداث ============ //
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', handleSubmit);
    document.getElementById('userQuestion').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });
});
