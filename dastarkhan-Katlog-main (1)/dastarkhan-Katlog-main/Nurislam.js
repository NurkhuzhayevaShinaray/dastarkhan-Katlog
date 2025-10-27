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
