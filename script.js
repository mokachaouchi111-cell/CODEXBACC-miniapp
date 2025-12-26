const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

/* ========= ELEMENTS ========= */
const mainView = document.getElementById("main-view");
const streamsView = document.getElementById("streams-view");
const viewTitle = document.getElementById("view-title");

/* ========= DATA ========= */
const streamsData = {
  "علوم تجريبية": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات"],
  "رياضيات": ["الرياضيات", "العلوم الفيزيائية"],
  "تقني رياضي": ["التكنولوجيا", "الرياضيات"],
  "تسيير و اقتصاد": ["محاسبة", "اقتصاد", "قانون"],
  "لغات اجنبية": ["فرنسية", "إنجليزية", "إسبانية"],
  "اداب و فلسفة": ["فلسفة", "لغة عربية", "تاريخ وجغرافيا"]
};

/* ========= UI LOGIC (NAVIGATION) ========= */

// وظيفة فتح واجهة الشعب
function openStreams(context) {
    tg.HapticFeedback.impactOccurred('medium'); // اهتزاز عند النقر
    
    viewTitle.innerText = context; // ضبط العنوان (Quiz أو بكالوريات)
    mainView.classList.add('hidden');
    streamsView.classList.remove('hidden');
    
    // إظهار زر العودة الرسمي في تلجرام
    tg.BackButton.show();
}

// العودة للرئيسية عند الضغط على زر العودة في تلجرام
tg.BackButton.onClick(() => {
    tg.HapticFeedback.notificationOccurred('success');
    streamsView.classList.add('hidden');
    mainView.classList.remove('hidden');
    tg.BackButton.hide();
});

// وظيفة اختيار الشعبة
function selectStream(streamName) {
    tg.HapticFeedback.selectionChanged();
    
    // هنا يتم الانتقال للمرحلة القادمة (اختيار المادة)
    console.log("الشعبة المختارة: " + streamName);
    
    // مثال بسيط للتفاعل
    tg.showAlert(`لقد اخترت شعبة: ${streamName}\nسيتم إضافة الأسئلة الخاصة بها قريباً.`);
}

/* ========= QUIZ LOGIC (للإبقاء على الوظائف السابقة) ========= */

const state = {
  quiz: null,
  index: 0,
  score: 0
};

// ملاحظة: يمكنك لاحقاً دمج منطق الكويز الخاص بك لعرض المواد بناءً على الشعبة المختارة