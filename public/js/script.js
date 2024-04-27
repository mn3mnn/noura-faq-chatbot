const questions = {
    en: [
        { id: 1, q: "What should I do if my smart ID card is lost or stolen?", a: "If your smart ID card is lost or stolen, any attempt to access it within the system will be unauthorized until a report is made. For assistance, please contact us immediately at 011 822 0000." },
        { id: 2, q: "How do I update the personal information associated with my smart ID card?", a: "If you want to update your personal information, please head to the Student Affairs Administration." },
        { id: 3, q: "What should I do if my smart ID card is not working properly?", a: "Please call (011 822 0000) to repair your card or to be provided with a temporary permit." },
        { id: 4, q: "How do I verify my attendance using the smart ID card?", a: "Control panel." },
        { id: 5, q: "Is there available parking?", a: "Control panel." },
        { id: 6, q: "When will the next metro arrive?", a: "Control panel." },
        { id: 7, q: "How can I borrow a book from the library?", a: "To borrow a book, you must register for the requested book and then scan your card to complete the registration." },
        { id: 8, q: "How can a visitor obtain permission to access university facilities?", a: "To obtain a visitor's permit to access Princess Nourah University, please contact Tawasul Nourah through the provided link. <a href=\"https://tawasulnourah.pnu.edu.sa/\" target=\"_blank\" class=\"text-blue-500 hover:text-blue-700 underline\">tawasulnourah.pnu.edu.sa/</a>" },
        { id: 9, q: "Other Inquiries", a: "For other inquiries or questions, please refer to the following email/phone number: <a href=\"https://Info@pnu.edu.sa\" target=\"_blank\" class=\"text-blue-500 hover:text-blue-700 underline\">Info@pnu.edu.sa</a>  (+966118220000)" }
    ],
    ar: [
        { id: 1, q: "ماذا أفعل إذا تم فقدان بطاقة الهوية الذكية الخاصة بي أو سرقتها؟", a: "إذا فقدت بطاقة الهوية الذكية أو سرقت، سيعتبر أي محاولة للوصول إليها ضمن النظام غير مصرح بها حتى يتم تقديم تقرير. للمساعدة، يرجى الاتصال بنا على الفور على 0000 822 011 ." },
        { id: 2, q: "كيف أقوم بتحديث المعلومات الشخصية المرتبطة ببطاقة الهوية الذكية؟", a: "إذا أردت تحديث معلوماتك الشخصية، يرجى التوجه الى إدارة شؤون الطالبات." },
        { id: 3, q: "ماذا يجب أن أفعل إذا لم تعمل بطاقة الهوية الذكية بشكل صحيح؟", a: "يرجى الاتصال (011 822 0000) لإصلاح بطاقتك أو لتزويدك بتصريح مؤقت." },
        { id: 4, q: "كيف أتحقق من حضوري باستخدام بطاقة الهوية الذكية؟", a: "لوحة التحكم." },
        { id: 5, q: "هل يوجد مكان لوقوف السيارات متاح؟", a: "لوحة التحكم." },
        { id: 6, q: "متى ستصل أقرب مترو؟", a: "لوحة التحكم." },
        { id: 7, q: "كيف يمكنني استعارة كتاب من المكتبة؟", a: "لاستعارة كتاب، يجب عليك التسجيل للكتاب المطلوب ثم مسح بطاقتك لإكمال التسجيل." },
        { id: 8, q: "كيف يمكن للزائر الحصول على إذن للوصول إلى مرافق الجامعة؟", a: "للحصول على تصريح زائر للوصول إلى جامعة الأميرة نورة، يرجى الاتصال بتواصل نورة من خلال الرابط المقدم. <a href=\"https://tawasulnourah.pnu.edu.sa/\" target=\"_blank\" class=\"text-blue-500 hover:text-blue-700 underline\">tawasulnourah.pnu.edu.sa/</a>" },
        { id: 9, q: "أخرى", a: "إذا كان لديك أي استفسارات أو أسئلة أخرى الرجوع إلى البريد الإلكتروني/الرقم التالي: <a href=\"https://Info@pnu.edu.sa\" target=\"_blank\" class=\"text-blue-500 hover:text-blue-700 underline\">Info@pnu.edu.sa</a>   (+966118220000)"}
    ],
};

const translations = {
    en: {
        customer: "PNU community",
        chatbot: "ChatBot",
        welcomeMessage: "Welcome to (Elevate PNU) chatbot! Please select your preferred language to start",
    },
    ar: {
        customer: "العميل",
        chatbot: "الروبوت",
        welcomeMessage: "مرحبًا بك في برنامج الدردشة الآلي (Elevate PNU)! الرجاء تحديد لغتك المفضلة للبدء",
    }
};

let chatHistory = [];

function setLanguage(lang) {
    localStorage.setItem('chatLang', lang);
    updateUIForLanguage(lang);
    displayQuestions(lang);
}

let currentLabels = translations.en;

function updateUIForLanguage(lang) {
    const chatBody = document.getElementById('chat-body');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const dynamicLabel = document.getElementById('dynamicLabel');

    chatBody.classList.remove('text-right', 'text-left');

    if (lang === 'ar') {
        chatBody.classList.add('text-right');
        welcomeMessage.innerText = translations.ar.welcomeMessage;
        dynamicLabel.innerText = translations.ar.chatbot;
        currentLabels = translations.ar;
    } else {
        chatBody.classList.add('text-left');
        welcomeMessage.innerText = translations.en.welcomeMessage;
        dynamicLabel.innerText = translations.en.chatbot;
        currentLabels = translations.en;
    }

    renderMessages();
}

function displayQuestions(lang) {
    const list = document.getElementById('questionList');
    list.innerHTML = '';
    questions[lang].forEach(question => {
        const item = document.createElement('li');
        item.innerText = question.q;
        item.className = "cursor-pointer p-2 rounded border-2 border-sky-900 text-black hover:bg-sky-900 hover:text-white inline-block rounded-2xl mt-2 text-sm";
        item.onclick = () => {    
            displayAnswer(question.id, question.q, question.a);
        }
        list.appendChild(item);
    });
}

function displayAnswer(id ,question, answer) {
    chatHistory.push({ id, question, answer });
    renderMessages();
}

function scrollToBottom() {
    var messagesContainer = document.getElementById('messages-container');
    var bottomElement = messagesContainer.lastElementChild;
    if (bottomElement) {
        bottomElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}

function renderMessages() {
    const messagesContainer = document.getElementById('messages-container');
    const lang = localStorage.getItem('chatLang') || 'en';
    const langDirection = lang === 'ar' ? 'rtl' : 'ltr';

    messagesContainer.innerHTML = '';
    chatHistory.forEach(message => {
        if (lang === 'ar') {
            message.question = questions.ar.find(q => q.id === message.id).q;
            message.answer = questions.ar.find(q => q.id === message.id).a;
        } else {
            message.question = questions.en.find(q => q.id === message.id).q;
            message.answer = questions.en.find(q => q.id === message.id).a;
        }
        messagesContainer.innerHTML += `
            <div class="flex flex-col items-end">
                <div class="text-sm text-gray-700 font-bold">${currentLabels.customer}</div>
                <div class="max-w-2xl p-2 mt-1 bg-whitee-200 rounded-l-2xl rounded-br-2xl rounded-tr-sm" style="direction: ${langDirection};">${message.question}</div>
            </div>
            <div class="flex flex-col items-start">
                <div class="text-sm text-gray-700 font-bold">${currentLabels.chatbot}</div>
                <div class="max-w-2xl p-2 mt-1 bg-whitee-200 rounded-r-2xl rounded-bl-2xl rounded-tl-sm" style="direction: ${langDirection};">${message.answer}</div>
            </div>
        `;
    });
    scrollToBottom();
}

window.onload = () => {
    const lang = localStorage.getItem('chatLang') || 'en';
    setLanguage(lang);
};
