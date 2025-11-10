$(document).ready(function(){

  console.log("jQuery is ready!");


  $(window).on('scroll', function(){
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrolled = (scrollTop / docHeight) * 100;
    $('#progressBar').css('width', scrolled + '%');
  });


  
  $('#deliveryForm').on('submit', function(e){
    e.preventDefault();

    const name = $('#name').val().trim();
    const phone = $('#phone').val().trim();
    const address = $('#address').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message');
    const btn = $(this).find('button[type=submit]');

    let errors = [];

    if (name === "") errors.push("Введите имя");
    if (address === "") errors.push("Введите адрес");
    if (phone === "" || !/^\+?\d{10,13}$/.test(phone)) errors.push("Введите корректный телефон");
    if (email === "" || !email.includes("@")) errors.push("Введите корректный email");

    if (errors.length > 0) {
      message.css('color', 'red').text(errors.join(', '));
      return;
    }

    
    btn.prop('disabled', true).html('<span class="spinner"></span> Отправка...');

    setTimeout(function(){
      btn.prop('disabled', false).text('Отправить заказ');
      message.css('color', 'green').text('Спасибо! Ваша заявка отправлена.');
      showToast('Форма успешно отправлена!');
      $('#deliveryForm')[0].reset();
    }, 2000);
  });


  function showToast(text){
    let toast = $('<div class="toast"></div>').text(text);
    $('body').append(toast);
    toast.fadeIn(400).delay(2000).fadeOut(400, function(){ $(this).remove(); });
  }

  const deliveryOptions = [
    { min: 0, max: 5000, cost: 1000 },
    { min: 5000, max: 10000, cost: 500 },
    { min: 10000, max: Infinity, cost: 0 }
  ];

  $('#sum').on('input', function(){
    const sum = Number($(this).val());
    let deliveryCost = 0;

    for (let option of deliveryOptions) {
      if (sum >= option.min && sum < option.max) {
        deliveryCost = option.cost;
        break;
      }
    }

    $('#cost').text(
      deliveryCost === 0 ? "Бесплатная доставка" : `Стоимость доставки: ${deliveryCost} ₸`
    );
  });


});





let currentMode = localStorage.getItem("mode") || "light";
$("body").toggleClass("dark-mode", currentMode === "dark");


function updateThemeIcon() {
  if ($("body").hasClass("dark-mode")) {
    $("#themeToggle").text("☀️"); 
  } else {
    $("#themeToggle").text("🌙"); 
  }
}
updateThemeIcon();


$("#themeToggle").click(function(){
  $("body").toggleClass("dark-mode");
  let newMode = $("body").hasClass("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", newMode);
  updateThemeIcon();
});



