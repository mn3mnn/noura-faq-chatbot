console.log('Script loaded');

const questions = {
    en: [
        { id: 1, q: "What is your return policy?", a: "You can return any item within 30 days of purchase." },
        { id: 2, q: "How to track my order?", a: "You can track your order through our tracking page." },
        { id: 3, q: "How to contact customer service?", a: "You can contact customer service through our contact page."},
        { id: 4, q: "How to change my password?", a: "You can change your password through your account settings."}
    ],
    ar: [
        { id: 1, q: "ما هي سياسة الإرجاع؟", a: "يمكنك إرجاع أي منتج خلال 30 يومًا من الشراء" },
        { id: 2, q: "كيف يمكنني تتبع طلبي؟", a: "يمكنك تتبع طلبك من خلال صفحة التتبع الخاصة بنا" },
        { id: 3, q: "كيف يمكنني الاتصال بخدمة العملاء؟", a: "يمكنك الاتصال بخدمة العملاء من خلال صفحة الاتصال بنا" },
        { id: 4, q: "كيف يمكنني تغيير كلمة المرور؟", a: "يمكنك تغيير كلمة المرور من خلال إعدادات الحساب الخاصة بك" }
    ]
};


const translations = {
    en: {
        customer: "Customer",
        chatbot: "ChatBot",
        welcomeMessage: "Welcome! I'm here to help.",
    },
    ar: {
        customer: "العميل",
        chatbot: "الروبوت",
        welcomeMessage: "أهلاً! أنا هنا لمساعدتك.",
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
                <div class="max-w-80 p-2 mt-1 bg-white rounded-l-2xl rounded-br-2xl rounded-tr-sm">${message.question}</div>
            </div>
            <div class="flex flex-col items-start">
                <div class="text-sm text-gray-700 font-bold">${currentLabels.chatbot}</div>
                <div class="max-w-80 p-2 mt-1 bg-white rounded-r-2xl rounded-bl-2xl rounded-tl-sm">${message.answer}</div>
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
    if (questionListContainer.style.height === '144px') {
        questionListContainer.style.height = '288px';
        this.textContent = '▼';
    } else {
        questionListContainer.style.height = '144px';
        this.textContent = '▲';
    }
});
