const tg = window.Telegram.WebApp;
const telegram_id = tg.initDataUnsafe.user.id;


// ==== 1. Проверяем аккаунт ====

async function checkAuth() {
    const response = await fetch("https://ТВОЙ_БЭКЕНД/auth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({telegram_id})
    });

    const data = await response.json();

    if (data.status === "ok") {
        showProfile(data.user.name);
    } else {
        showRegistration();
    }
}


// ==== 2. Показ профиля ====

function showProfile(name) {
    document.getElementById("screen").innerHTML = `
        <h2>Ваш профиль</h2>
        <p>Имя: ${name}</p>
        <button id="logoutBtn">Выйти из аккаунта</button>
    `;

    document.getElementById("logoutBtn").onclick = logout;
}


// ==== 3. Показ регистрации ====

function showRegistration() {
    document.getElementById("screen").innerHTML = `
        <h2>Регистрация</h2>
        <input id="name" placeholder="Введите имя"/>
        <button id="regBtn">Зарегистрироваться</button>
    `;

    document.getElementById("regBtn").onclick = register;
}


// ==== 4. Регистрация ====

async function register() {
    const name = document.getElementById("name").value;

    await fetch("https://ТВОЙ_БЭКЕНД/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({telegram_id, name})
    });

    tg.close();
}


// ==== 5. Логаут ====

async function logout() {
    await fetch("https://ТВОЙ_БЭКЕНД/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({telegram_id})
    });

    tg.close();
}


// ==== Запуск приложения ====
checkAuth();
