const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

/* ========= ELEMENTS ========= */
const mainView = document.getElementById("main-view");
const streamsView = document.getElementById("streams-view");
const materialsView = document.getElementById("materials-view"); // العنصر الجديد
const viewTitle = document.getElementById("view-title");
const selectedStreamTitle = document.getElementById("selected-stream-title");
const materialsGrid = document.getElementById("materials-grid");

/* ========= DATA (الربط مع أيقونات كانفا) ========= */
const materialIcons = {
    "الرياضيات": "icons/math.png",
    "العلوم الفيزيائية": "icons/physics.png",
    "علوم الطبيعة": "icons/biology.png",
    "لغة عربية": "icons/arabic.png",
    "إنجليزية": "icons/english.png",
    "فرنسية": "icons/french.png",
    "فلسفة": "icons/philosophy.png",
    "تاريخ وجغرافيا": "icons/history.png",
    " العلوم الاسلامية":"icons/islamic.png",
    "محاسبة": "icons/math.png", // يمكنك تغييرها لأيقونة خاصة
    "اقتصاد": "icons/history.png",
    "قانون": "icons/philosophy.png",
    "التكنولوجيا": "icons/physics.png"
};

const streamsData = {
  "علوم تجريبية": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
  "رياضيات": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
  "تقني رياضي": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
  "تسيير و اقتصاد": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
  "لغات اجنبية": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
  "اداب و فلسفة": ["علوم الطبيعة", "العلوم الفيزيائية", "الرياضيات", "لغة عربية", "إنجليزية", "فرنسية", "فلسفة", "تاريخ وجغرافيا", "العلوم الإسلامية"],
};

/* ========= UI LOGIC (NAVIGATION) ========= */

// 1. فتح واجهة الشعب
function openStreams(context) {
    tg.HapticFeedback.impactOccurred('medium');
    
    viewTitle.innerText = context;
    mainView.classList.add('hidden');
    streamsView.classList.remove('hidden');
    materialsView.classList.add('hidden'); // التأكد من إخفاء المواد
    
    tg.BackButton.show();
}

// 2. اختيار الشعبة وعرض المواد (الميزة الجديدة)
function selectStream(streamName) {
    tg.HapticFeedback.selectionChanged();
    
    selectedStreamTitle.innerText = streamName;
    materialsGrid.innerHTML = ""; // مسح الأيقونات السابقة

    const materials = streamsData[streamName] || [];

    materials.forEach(mat => {
        const iconPath = materialIcons[mat] || "icons/math.png"; // أيقونة افتراضية
        
        const item = document.createElement('div');
        item.className = 'material-item';
        item.innerHTML = `
            <div class="material-icon-card">
                <img src="${iconPath}" alt="${mat}">
            </div>
            <div class="mat-label">${mat}</div>
        `;
        
        item.onclick = () => {
            tg.HapticFeedback.impactOccurred('light');
            startQuiz(mat); // الدالة التي ستشغل الكويز لاحقاً
        };
        materialsGrid.appendChild(item);
    });

    streamsView.classList.add('hidden');
    materialsView.classList.remove('hidden');
}

// 3. منطق زر العودة المطور
tg.BackButton.onClick(() => {
    tg.HapticFeedback.notificationOccurred('success');
    
    // إذا كان في واجهة المواد، يرجع لواجهة الشعب
    if (!materialsView.classList.contains('hidden')) {
        materialsView.classList.add('hidden');
        streamsView.classList.remove('hidden');
    } 
    // إذا كان في واجهة الشعب، يرجع للرئيسية
    else if (!streamsView.classList.contains('hidden')) {
        streamsView.classList.add('hidden');
        mainView.classList.remove('hidden');
        tg.BackButton.hide();
    }
});

/* ========= QUIZ LOGIC ========= */

function startQuiz(materialName) {
    tg.showAlert(`سيتم فتح أسئلة مادة: ${materialName} قريباً!`);
    // هنا ستضع لاحقاً الكود الذي يجلب الأسئلة من قاعدة البيانات
}