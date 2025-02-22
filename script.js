let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем WebApp

let selectedRating = 0;

// Обработчик клика по звёздам
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
        selectedRating = parseInt(this.getAttribute("data-value"));
        updateStars(selectedRating);
    });
});

// Функция для обновления цвета звёзд
function updateStars(rating) {
    document.querySelectorAll(".star").forEach(star => {
        if (parseInt(star.getAttribute("data-value")) <= rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}

// Обработчик отправки отзыва
document.getElementById("sendReview").addEventListener("click", function() {
    let reviewText = document.getElementById("review").value.trim();

    if (reviewText === "") {
        alert("Пожалуйста, напишите отзыв.");
        return;
    }
    if (selectedRating === 0) {
        alert("Выберите количество звёзд.");
        return;
    }

    let reviewData = {
        review: reviewText,
        rating: selectedRating
    };

    tg.sendData(JSON.stringify(reviewData)); // Отправляем данные боту
    tg.close(); // Закрываем WebApp
});
