
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

   
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}


let cartCount = 0;
let cartTotal = 0;

function initializeCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        cartCount = cart.count || 0;
        cartTotal = cart.total || 0;
        updateCartDisplay();
    }

    
    document.querySelectorAll('.product-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product');
            const productName = productCard.querySelector('h4').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseFloat(priceText.match(/(\d+)/)[0]);
            const quantity = parseInt(this.querySelector('input[type="number"]').value);

            addToCart(productName, price, quantity);
            
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Добавлено!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);
        });
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartCount === 0) {
                alert('Корзина пуста!');
                return;
            }
            
            alert(`Заказ оформлен! Сумма: ${cartTotal} KZT`);
            clearCart();
        });
    }
}

function addToCart(productName, price, quantity) {
    cartCount += quantity;
    cartTotal += price * quantity;
    
    updateCartDisplay();
    saveCartToStorage();
    showCartNotification(productName, quantity);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cartCountElement) cartCountElement.textContent = cartCount;
    if (cartTotalElement) cartTotalElement.textContent = cartTotal;
}

function showCartNotification(productName, quantity) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i> Добавлено: ${quantity} × ${productName}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);}, 3000);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify({
        count: cartCount,
        total: cartTotal
    }));
}

function clearCart() {
    cartCount = 0;
    cartTotal = 0;
    updateCartDisplay();
    saveCartToStorage();
}

function initializeStarRating() {
    document.querySelectorAll('.stars').forEach(starsContainer => {
        const stars = starsContainer.querySelectorAll('span');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                stars.forEach((s, i) => {
                    s.style.color = i <= index ? 'gold' : 'gray';
                });
                
                const productName = starsContainer.closest('.product').querySelector('h4').textContent;
                const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
                ratings[productName] = index + 1;
                localStorage.setItem('productRatings', JSON.stringify(ratings));
            });
        });
    });
}

function initializeFormValidation() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredInputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });
}

function initializeSalesPage() {
    const page = document.title.toLowerCase();
    if (!page.includes('скидки') && !page.includes('sales')) return;

    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscriptionFormContainer = document.getElementById('subscriptionForm');
    
    if (subscribeBtn && subscriptionFormContainer) {
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

            const backBtn = document.getElementById('backBtn');
            const nextBtn = document.getElementById('nextBtn');
            const confirmBtn = document.getElementById('confirmBtn');

            if (backBtn) backBtn.addEventListener('click', prevFormStep);
            if (nextBtn) nextBtn.addEventListener('click', nextFormStep);
            if (confirmBtn) confirmBtn.addEventListener('click', confirmSubscription);
        }

        function nextFormStep() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');

            if (currentStep === 0 && (!name || !name.value.trim())) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            if (currentStep === 1 && (!email || !email.value.trim())) {
                alert('Пожалуйста, введите ваш email');
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
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;

            if (!name || !email) {
                window.location.href = 'auth.html';
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

        subscribeBtn.addEventListener('click', () => {
            currentStep = 0;
            isFormVisible = true;
            loadSubscriptionForm();

            document.querySelector('.subscription-form-container').scrollIntoView({
                behavior: 'smooth'
            });

            subscribeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                subscribeBtn.style.transform = 'scale(1)';}, 200);
        });

        loadSubscriptionForm();
    }


    const saleTimerBtn = document.getElementById('saleTimerBtn');
    const timeDisplay = document.getElementById('timeDisplay');
    
    if (saleTimerBtn && timeDisplay) {
        saleTimerBtn.addEventListener('click', function() {
            if (timeDisplay.style.display === 'block') {
                timeDisplay.style.display = 'none';
                timeDisplay.classList.remove('show');
                return;
            }
            
            timeDisplay.style.display = 'block';
            timeDisplay.classList.add('show');
            
            const saleEndTime = new Date();
            saleEndTime.setHours(saleEndTime.getHours() + 5);
            
            function updateTimer() {
                const now = new Date();
                const timeLeft = saleEndTime - now;
                
                if (timeLeft <= 0) {
                    timeDisplay.innerHTML = 'Акция завершена!';
                    return;
                }
                
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timeDisplay.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            updateTimer();
            const timerInterval = setInterval(updateTimer, 1000);
        });
    }
    const filterLinks = document.querySelectorAll('.sidebar a[data-filter]');
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            filterSalesItems(filterValue);
           
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function filterSalesItems(filter) {
        const saleBanners = document.querySelectorAll('.sale-banner');
        
        saleBanners.forEach(banner => {
            const discount = parseInt(banner.getAttribute('data-discount'));
            let show = true;
            
            if (filter === 'super') {
                show = discount >= 50;
            } else if (filter !== 'all') {
                const maxDiscount = parseInt(filter);
                show = discount <= maxDiscount;
            }
            
            banner.style.display = show ? 'flex' : 'none';
        });
    }
}

function initializeCatalogPage() {
    const page = document.title.toLowerCase();
    
    if (!page.includes('каталог') && !page.includes('catalog')) return;

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        if ($('#suggestions').length === 0) {
            $('#searchInput').after('<ul id="suggestions" class="suggestions"></ul>');
        }

        $('#searchInput').on('keyup', function() {
            const searchTerm = $(this).val().toLowerCase().trim();
            const suggestions = $('#suggestions').empty();

            $('.product').each(function() {
                const name = $(this).find('h4').text().toLowerCase();
                $(this).toggle(name.includes(searchTerm));
            });

            if (searchTerm) {
                $('.product h4').each(function() {
                    const name = $(this).text();
                    if (name.toLowerCase().includes(searchTerm))
                        suggestions.append(`<li class="suggest-item">${name}</li>`);
                });
            }

            $('.product h4').each(function() {
                const originalText = $(this).text();
                if (!searchTerm) return $(this).html(originalText);
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                $(this).html(originalText.replace(regex, '<span class="highlight">$1</span>'));
            });
        });

        $(document).on('click', '.suggest-item', function() {
            $('#searchInput').val($(this).text());
            $('#suggestions').empty();
            $('#searchInput').trigger('keyup');
        });
    }

    const applyFilter = document.getElementById('applyFilter');
    if (applyFilter) {
        applyFilter.addEventListener('click', function() {
            const category = $('#categoryFilter').val();
            const maxPrice = parseInt($('#priceFilter').val());

            $('.product').each(function() {
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
    }

    $('.product').hide().fadeIn(1000);
    
    $('.product').hover(
        function() {
            $(this).css({ transform: 'scale(1.05)', transition: '0.3s' });
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    $('.product h4').on('click', function() {
        $('.product h4').css('color', '');
        $(this).css('color', '#348f22');
    });

    $('.product').on('dblclick', function() {
        $(this).fadeOut(200).fadeIn(200).css('background-color', '#e8ffe8');
    });

    $(document).on('keydown', function(event) {
        if (event.key.toLowerCase() === 'c') {
            clearCart();
            
            const msg = $('<p>Корзина очищена!</p>')
                .css({ 
                    position: 'fixed', 
                    bottom: '20px', 
                    right: '20px', 
                    background: '#4CAF50', 
                    color: 'white', 
                    padding: '10px', 
                    borderRadius: '6px' 
                })
                .appendTo('body');
            setTimeout(() => msg.fadeOut(500, () => msg.remove()), 2000);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeCart();
    initializeStarRating();
    initializeFormValidation();
    initializeSalesPage();
    initializeCatalogPage();
});

if (!$('style#dynamic-styles').length) {
    $('<style id="dynamic-styles">')
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
}
