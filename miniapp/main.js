let tg = window.Telegram.WebApp;

tg.expand();

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".qbtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.cat;
            const amount = btn.dataset.amount;

            sendExpense(amount, category);
        });
    });

    document.getElementById("openAdd").addEventListener("click", () => {
        tg.showAlert("Позже добавим ручное добавление!");
    });
});

function sendExpense(amount, category) {
    tg.sendData(JSON.stringify({
        type: "add_expense",
        amount,
        category
    }));
}
