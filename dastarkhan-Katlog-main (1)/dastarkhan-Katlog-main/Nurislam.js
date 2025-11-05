// Ленивая загрузка изображений
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
});

// Копирование отзывов
$(document).ready(function () {
  $(".copy-btn").on("click", function () {
    const text = $(this).siblings(".review-text").text();
    navigator.clipboard.writeText(text);
    $(this).html('<i class="fa fa-check"></i> Copied!');
    setTimeout(() => {
      $(this).html('<i class="fa fa-copy"></i> Copy');
    }, 1500);
  });
});

$(document).ready(function () {
  $(".color-btn").hover("click", function () {
    $9(this).css("background-color", "#ffcc00");
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $("body").css("background-color", randomColor);
  });
});
// Добавляем переход по клику на карточку
document.querySelectorAll('.product img, .product h4').forEach(el => {
  el.addEventListener('click', () => {
    window.location.href = 'catalog.html';
  });
});
// 🌙 Темный / светлый режим
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Проверяем сохранённую тему
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeBtn.textContent = '☀️';
}

// Клик по кнопке
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});
