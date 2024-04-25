console.log('Script loaded');

const questions = {
    en: [
        { id: 1, q: "What should I do if my smart ID card is lost or stolen?", a: "If your smart ID card is lost or stolen, any attempt to access it within the system will be unauthorized until a report is made. For assistance, please contact us immediately at 011 822 0000." },
        { id: 2, q: "How do I update the personal information associated with my smart ID card?", a: "If you want to update your personal information, please head to the Student Affairs Administration." },
        { id: 3, q: "What should I do if my smart ID card is not working properly?", a: "Please call (011 822 0000) to repair your card or to be provided with a temporary permit." },
        { id: 4, q: "How do I verify my attendance using the smart ID card?", a: "Control panel." },
        { id: 5, q: "Is there available parking?", a: "Control panel." },
        { id: 6, q: "When will the next metro arrive?", a: "Control panel." },
        { id: 7, q: "How can I borrow a book from the library?", a: "To borrow a book, you must register for the requested book and then scan your card to complete the registration." },
        { id: 8, q: "How can a visitor obtain permission to access university facilities?", a: "To obtain a visitor's permit to access Princess Nourah University, please contact Tawasul Nourah through the provided link. (https://tawasulnourah.pnu.edu.sa/)" }
    ],
    ar: [
        { id: 1, q: "ماذا أفعل إذا تم فقدان بطاقة الهوية الذكية الخاصة بي أو سرقتها؟", a: "إذا فقدت بطاقة الهوية الذكية أو سرقت، سيعتبر أي محاولة للوصول إليها ضمن النظام غير مصرح بها حتى يتم تقديم تقرير. للمساعدة، يرجى الاتصال بنا على الفور على 011 822 0000." },
        { id: 2, q: "كيف أقوم بتحديث المعلومات الشخصية المرتبطة ببطاقة الهوية الذكية؟", a: "إذا أردت تحديث معلوماتك الشخصية، يرجى التوجه الى إدارة شؤون الطالبات." },
        { id: 3, q: "ماذا يجب أن أفعل إذا لم تعمل بطاقة الهوية الذكية بشكل صحيح؟", a: "يرجى الاتصال (011 822 0000) لإصلاح بطاقتك أو لتزويدك بتصريح مؤقت." },
        { id: 4, q: "كيف أتحقق من حضوري باستخدام بطاقة الهوية الذكية؟", a: "لوحة التحكم." },
        { id: 5, q: "هل يوجد مكان لوقوف السيارات متاح؟", a: "لوحة التحكم." },
        { id: 6, q: "متى ستصل أقرب مترو؟", a: "لوحة التحكم." },
        { id: 7, q: "كيف يمكنني استعارة كتاب من المكتبة؟", a: "لاستعارة كتاب، يجب عليك التسجيل للكتاب المطلوب ثم مسح بطاقتك لإكمال التسجيل." },
        { id: 8, q: "كيف يمكن للزائر الحصول على إذن للوصول إلى مرافق الجامعة؟", a: "للحصول على تصريح زائر للوصول إلى جامعة الأميرة نورة، يرجى الاتصال بتواصل نورة من خلال الرابط المقدم. (https://tawasulnourah.pnu.edu.sa/)" }
    ]
};


const translations = {
    en: {
        customer: "Customer",
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
    const questionList = document.getElementById('questionList');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const dynamicLabel = document.getElementById('dynamicLabel');
    const englishBtn = document.getElementById('englishBtn');
    const arabicBtn = document.getElementById('arabicBtn');

    chatBody.classList.remove('text-right', 'text-left');
    questionList.classList.remove('items-end', 'items-start');
    welcomeMessage.classList.remove('rounded-tr-2xl', 'rounded-tl-sm', 'rounded-tl-2xl', 'rounded-tr-sm');

    if (lang === 'ar') {
        chatBody.classList.add('text-right');
        questionList.classList.add('items-end');
        welcomeMessage.innerText = translations.ar.welcomeMessage;
        dynamicLabel.innerText = translations.ar.chatbot;
        welcomeMessage.classList.add('rounded-tl-2xl', 'rounded-tr-sm');
        englishBtn.innerText = "الإنجليزية";
        arabicBtn.innerText = "العربية";
        currentLabels = translations.ar;
    } else {
        chatBody.classList.add('text-left');
        questionList.classList.add('items-start');
        welcomeMessage.innerText = translations.en.welcomeMessage;
        dynamicLabel.innerText = translations.en.chatbot;
        welcomeMessage.classList.add('rounded-tr-2xl', 'rounded-tl-sm');
        englishBtn.innerText = "English";
        arabicBtn.innerText = "Arabic";
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
        item.className = "cursor-pointer p-2 rounded border-2 border-primary text-black hover:bg-primary hover:text-white inline-block rounded-2xl";
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

function renderMessages() {
    const messagesContainer = document.getElementById('messages-container');
    console.log(chatHistory);
    messagesContainer.innerHTML = '';
    console.log(chatHistory);

    chatHistory.forEach(message => {
        if (localStorage.getItem('chatLang') === 'ar') {
            message.question = questions.ar.find(q => q.id === message.id).q;
            message.answer = questions.ar.find(q => q.id === message.id).a;
        } else {
            message.question = questions.en.find(q => q.id === message.id).q;
            message.answer = questions.en.find(q => q.id === message.id).a;
        }
        messagesContainer.innerHTML += `
            <div class="flex flex-col items-end">
                <div class="text-sm text-gray-700 font-bold">${currentLabels.customer}</div>
                <div class="max-w-xl p-2 mt-1 bg-white rounded-l-2xl rounded-br-2xl rounded-tr-sm">${message.question}</div>
            </div>
            <div class="flex flex-col items-start">
                <div class="text-sm text-gray-700 font-bold">${currentLabels.chatbot}</div>
                <div class="max-w-xl p-2 mt-1 bg-white rounded-r-2xl rounded-bl-2xl rounded-tl-sm">${message.answer}</div>
            </div>
        `;
    });
}


window.onload = () => {
    const lang = localStorage.getItem('chatLang') || 'en';
    setLanguage(lang);
};

document.getElementById('toggleButton').addEventListener('click', function() {
    const questionListContainer = document.getElementById('questionListContainer');
    if (questionListContainer.style.height === '9rem') {
        questionListContainer.style.height = '18rem';
        this.textContent = '▼';
    } else {
        questionListContainer.style.height = '9rem';
        this.textContent = '▲';
    }
});
