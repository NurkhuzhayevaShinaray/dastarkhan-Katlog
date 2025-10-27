const page = document.title.toLowerCase();

if (page.includes("скидки") || page.includes("sales")) {
  console.log("Loaded: Sales Page Features");

  const subscribeBtn = document.getElementById("subscribeBtn");
  const subscriptionFormContainer = document.getElementById("subscriptionForm");
  let currentStep = 0;
  let isFormVisible = false;

  const formSteps = [
    {
      title: "Шаг 1: Ваше имя",
      html: `
        <div class="form-step">
          <h4>Как вас зовут?</h4>
          <input type="text" id="name" placeholder="Введите ваше имя" required>
        </div>
      `
    },
    {
      title: "Шаг 2: Ваш email",
      html: `
        <div class="form-step">
          <h4>Ваш email для уведомлений</h4>
          <input type="email" id="email" placeholder="Введите ваш email" required>
        </div>
      `
    },
    {
      title: "Шаг 3: Подтверждение подписки",
      html: `
        <div class="form-step">
          <h4>Подтвердите подписку</h4>
          <p>Нажмите кнопку ниже, чтобы завершить подписку на уведомления о скидках</p>
          <div class="form-controls">
            <button type="button" id="confirmBtn">Подтвердить подписку</button>
          </div>
        </div>
      `
    }
  ];

  function loadSubscriptionForm() {
    const step = formSteps[currentStep];
    subscriptionFormContainer.innerHTML = `
      <h4>${step.title}</h4>
      ${step.html}
      <div class="form-controls">
        ${currentStep > 0 ? '<button type="button" id="backBtn">Назад</button>' : ''}
        ${currentStep < formSteps.length - 1 ? '<button type="button" id="nextBtn">Далее</button>' : ''}
      </div>
    `;

    const backBtn = document.getElementById("backBtn");
    const nextBtn = document.getElementById("nextBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    if (backBtn) backBtn.addEventListener("click", prevFormStep);
    if (nextBtn) nextBtn.addEventListener("click", nextFormStep);
    if (confirmBtn) confirmBtn.addEventListener("click", confirmSubscription);
  }

  function nextFormStep() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    if (currentStep === 0 && (!name || !name.value.trim())) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }
    if (currentStep === 1 && (!email || !email.value.trim())) {
      alert("Пожалуйста, введите ваш email");
      return;
    }

    currentStep++;
    loadSubscriptionForm();
  }

  function prevFormStep() {
    currentStep--;
    loadSubscriptionForm();
  }

  function confirmSubscription() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;

    if (!name || !email) {
      window.location.href = "auth.html";
      return;
    }

    subscriptionFormContainer.innerHTML = `
      <div style="text-align:center;padding:20px;">
        <i class="fas fa-check-circle" style="font-size:48px;color:#4CAF50;margin-bottom:15px;"></i>
        <h4 style="color:#4CAF50;">Подписка успешно оформлена!</h4>
        <p>Спасибо, ${name}! Теперь вы будете получать уведомления на ${email}</p>
      </div>
    `;
  }


  subscribeBtn.addEventListener("click", () => {
    currentStep = 0;
    isFormVisible = true;
    loadSubscriptionForm();

   
    document.querySelector(".subscription-form-container").scrollIntoView({
      behavior: "smooth"
    });

    
    subscribeBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      subscribeBtn.style.transform = "scale(1)";
    }, 200);
  });

  loadSubscriptionForm();

  
  let cartCount = 0;
  let cartTotal = 0;
  

  document.querySelectorAll(".product form button").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const productCard = button.closest(".product");
      const name = productCard.querySelector("h4").textContent;
      const priceText = productCard.querySelector(".price").textContent;
      const price = parseFloat(priceText.match(/(\d+)/)[0]);
      const qty = parseInt(productCard.querySelector('input[type="number"]').value);

      cartCount += qty;
      cartTotal += price * qty;

      button.textContent = "Добавлено!";
      button.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        button.textContent = "В корзину";
        button.style.backgroundColor = "#68c351";
      }, 1000);

      showCartNotification(name, qty);
    });
  });

  function showCartNotification(productName, quantity) {
    const notification = document.createElement("div");
    notification.classList.add("cart-notification");
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i> Добавлено: ${quantity} × ${productName}
    `;
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#4CAF50",
      color: "white",
      padding: "15px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: "1000",
      opacity: "0",
      transform: "translateX(100px)",
      transition: "all 0.3s"
    });

    document.body.appendChild(notification);
    setTimeout(() => (notification.style.opacity = "1"), 50);
    setTimeout(() => (notification.style.transform = "translateX(0)"), 50);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100px)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

//Каталог
if (page.includes("каталог") || page.includes("catalog")) {
  console.log("Loaded: Catalog Page Features");

  $(document).ready(function () {
    if ($('#suggestions').length === 0) {
      $('#searchInput').after('<ul id="suggestions" class="suggestions"></ul>');
    }

    $('#searchInput').on('keyup', function () {
      const searchTerm = $(this).val().toLowerCase().trim();
      const suggestions = $('#suggestions').empty();

      $('.product').each(function () {
        const name = $(this).find('h4').text().toLowerCase();
        $(this).toggle(name.includes(searchTerm));
      });

      if (searchTerm) {
        $('.product h4').each(function () {
          const name = $(this).text();
          if (name.toLowerCase().includes(searchTerm))
            suggestions.append(`<li class="suggest-item">${name}</li>`);
        });
      }

      $('.product h4').each(function () {
        const originalText = $(this).text();
        if (!searchTerm) return $(this).html(originalText);
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        $(this).html(originalText.replace(regex, '<span class="highlight">$1</span>'));
      });
    });

    $(document).on('click', '.suggest-item', function () {
      $('#searchInput').val($(this).text());
      $('#suggestions').empty();
      $('#searchInput').trigger('keyup');
    });

    $('<style>')
      .prop('type', 'text/css')
      .html(`
        .suggestions {
          list-style:none;
          padding:0;
          margin-top:5px;
          border:1px solid #ccc;
          max-width:250px;
          background:white;
          position:absolute;
          z-index:10;
        }
        .suggest-item { padding:5px 10px; cursor:pointer; }
        .suggest-item:hover { background:#e8f5e9; }
        .highlight { background:yellow; font-weight:bold; }
      `)
      .appendTo('head');


    $('.product').hide().fadeIn(1000);
    $('.product').hover(
      function () {
        $(this).css({ transform: 'scale(1.05)', transition: '0.3s' });
      },
      function () {
        $(this).css('transform', 'scale(1)');
      }
    );
    $('.product h4').on('click', function () {
      $('.product h4').css('color', '');
      $(this).css('color', '#348f22');
    });
    $('.product').on('dblclick', function () {
      $(this).fadeOut(200).fadeIn(200).css('background-color', '#e8ffe8');
    });


    const filterSection = `
      <div style="margin:10px 0;">
        <h3>Фильтр продуктов</h3>
        <label>Категория:</label>
        <select id="categoryFilter">
          <option value="all">Все</option>
          <option value="fruits">Фрукты</option>
          <option value="vegetables">Овощи</option>
          <option value="dairy">Молочные</option>
        </select>
        <label>Макс. цена (KZT):</label>
        <input type="number" id="priceFilter" value="2000">
        <button id="applyFilter">Применить</button>
      </div>`;
    $('main').prepend(filterSection);

    $('#applyFilter').on('click', function () {
      const category = $('#categoryFilter').val();
      const maxPrice = parseInt($('#priceFilter').val());

      $('.product').each(function () {
        const name = $(this).find('h4').text().toLowerCase();
        const price = parseInt($(this).find('.price').text());
        let show = true;

        if (category === "fruits" && !["бананы", "апельсины", "яблоки", "арбузы"].some(f => name.includes(f))) show = false;
        if (category === "vegetables" && !["картофель", "морковь", "помидоры", "огурцы"].some(f => name.includes(f))) show = false;
        if (category === "dairy" && !["молоко", "сметана", "творог", "сыр"].some(f => name.includes(f))) show = false;
        if (price > maxPrice) show = false;

        $(this).toggle(show);
      });
    });

    
    $('.product').each(function () {
      const stars = $('<div class="stars"></div>');
      for (let i = 1; i <= 5; i++) {
        const star = $('<span>★</span>').css({ color: 'gray', cursor: 'pointer' });
        star.on('click', function () {
          stars.find('span').each((idx, s) => {
            $(s).css('color', idx < i ? 'gold' : 'gray');
          });
        });
        stars.append(star);
      }
      $(this).append(stars);
    });

    
    let cartCount = 0;
    let cartTotal = 0;

    $('.product form').on('submit', function (e) {
      e.preventDefault();
      const price = parseInt($(this).closest('.product').find('.price').text());
      const qty = parseInt($(this).find('input').val());
      cartCount += qty;
      cartTotal += price * qty;

      const summary = $('h3 + .product');
      summary.find('p').eq(0).text(`Товаров в корзине: ${cartCount}`);
      summary.find('p').eq(1).text(`Общая сумма: ${cartTotal} KZT`);

      $(this).closest('.product')
        .css({ background: '#e0ffe0', transform: 'scale(1.03)' });
      setTimeout(() => $(this).closest('.product')
        .css({ background: 'white', transform: 'scale(1)' }), 500);
    });

    
    $(document).on('keydown', function (event) {
      if (event.key.toLowerCase() === 'c') {
        cartCount = 0;
        cartTotal = 0;
        const summary = $('h3 + .product');
        summary.find('p').eq(0).text('Товаров в корзине: 0');
        summary.find('p').eq(1).text('Общая сумма: 0 KZT');

        const msg = $('<p>Корзина очищена!</p>')
          .css({ position: 'fixed', bottom: '20px', right: '20px', background: '#4CAF50', color: 'white', padding: '10px', borderRadius: '6px' })
          .appendTo('body');
        setTimeout(() => msg.fadeOut(500, () => msg.remove()), 2000);
      }
    });
  });
}

