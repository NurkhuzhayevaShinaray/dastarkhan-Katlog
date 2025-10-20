const page = document.title.toLowerCase();

if (page.includes("скидки") || page.includes("sales")) {
  console.log("Loaded: Sales Page Features");

  const contentArea = document.querySelector('.main-content');

  const subscribeBtn = document.createElement('button');
  subscribeBtn.textContent = 'Subscribe for more discounts';
  subscribeBtn.style.backgroundColor = '#ff6600';
  subscribeBtn.style.color = 'white';
  subscribeBtn.style.border = 'none';
  subscribeBtn.style.padding = '10px 20px';
  subscribeBtn.style.margin = '20px 0';
  subscribeBtn.style.cursor = 'pointer';
  contentArea.append(subscribeBtn);

  const adDiv = document.createElement('div');
  adDiv.style.marginTop = '15px';
  adDiv.style.fontStyle = 'italic';
  contentArea.append(adDiv);

 
  const ads = [
    "🍇 Fresh grapes now 20% off!",
    "🍊 Are you orange lover, grab your 18% discount today!",
    "🍎 Did you know? Apples keep your heart healthy!",
    "🍉 Watermelons are the fruit of summer—get them 15% off!",
  ];


  subscribeBtn.addEventListener('click', ()=> {
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    adDiv.textContent = randomAd;
    adDiv.style.color = '#008000';
    adDiv.style.transition = 'all 0.5s';
  });

  const showTimeBtn = document.createElement('button');
  showTimeBtn.textContent = 'Show Sale Time';
  showTimeBtn.style.backgroundColor = '#4CAF50';
  showTimeBtn.style.color = 'white';
  showTimeBtn.style.border = 'none';
  showTimeBtn.style.padding = '10px 20px';
  showTimeBtn.style.margin = '20px';
  showTimeBtn.style.cursor = 'pointer';
  contentArea.append(showTimeBtn);

  const timeDiv = document.createElement('div');
  timeDiv.style.marginTop = '10px';
  timeDiv.style.fontWeight = 'bold';
  contentArea.append(timeDiv);

  showTimeBtn.addEventListener('click', () => {
    const currentTime = new Date().toLocaleTimeString();
    timeDiv.textContent = `⏰ Current Sale Time: ${currentTime}`;
    timeDiv.style.color = '#ff0000';
  });

  const formSteps = [
    `
    <h3>Step 1: Your Name</h3>
    <input type="text" id="name" placeholder="Enter your name">
    `,
    `
    <h3>Step 2: Your Email</h3>
    <input type="email" id="email" placeholder="Enter your email">
    `,
    `
    <h3>Step 3: Confirm Subscription</h3>
    <button id="confirm">Confirm Subscription</button>
    `
  ];
  

  const formContainer = document.createElement('div');
  formContainer.style.border = '1px solid #ccc';
  formContainer.style.padding = '15px';
  formContainer.style.marginTop = '25px';
  formContainer.style.borderRadius = '8px';

  contentArea.append(formContainer);
 
  let currentStep = 0;

  function showStep(step) {
    formContainer.innerHTML = formSteps[step];
    const controls = document.createElement('div');
    controls.style.marginTop = '10px';

    if (step > 0) {
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back';
      backBtn.onclick = () => {
        currentStep--;
        showStep(currentStep);
      };
      controls.append(backBtn);
    }

    if (step < formSteps.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => {
        currentStep++;
        showStep(currentStep);
      };
      controls.append(nextBtn);
    }

    formContainer.append(controls);
  }

  showStep(currentStep);
}


if (page.includes("каталог") || page.includes("catalog")) {
  console.log("Loaded: Catalog Page Features");
   document.addEventListener('keydown', (event) => {
    const message = document.createElement('p');
    switch (event.key) {
      case 'f':
        message.textContent = 'Filtering mode activated!';
        break;
      case 'b':
        message.textContent = 'Opening basket...';
        break;
      case 'r':
        message.textContent = 'Ready to rate a product!';
        break;
      default:
        message.textContent = ' Press f (filter), b (basket), or r (rate)';
    }
    document.body.append(message);
    message.style.transition = 'opacity 0.5s';
    setTimeout(() => message.remove(), 2000);
  });

  const products = document.querySelectorAll('.product');
  const filterSection = document.createElement('div');
  filterSection.innerHTML = `
    <h3>Filter Products</h3>
    <label>Category: </label>
    <select id="categoryFilter">
      <option value="all">All</option>
      <option value="fruits">Fruits</option>
      <option value="vegetables">Vegetables</option>
      <option value="dairy">Dairy</option>
    </select>

    <label>Max Price (KZT): </label>
    <input type="number" id="priceFilter" value="2000">
    <button id="applyFilter">Apply Filter</button>
  `;
  document.querySelector('main').prepend(filterSection);

  document.getElementById('applyFilter').addEventListener('click', () => {
    const category = document.getElementById('categoryFilter').value;
    const maxPrice = parseInt(document.getElementById('priceFilter').value);

    products.forEach(prod => {
      const name = prod.querySelector('h4').textContent.toLowerCase();
      const price = parseInt(prod.querySelector('.price').textContent);
      let show = true;

      if (category === 'fruits' && !['бананы', 'апельсины', 'яблоки', 'арбузы'].some(f => name.includes(f))) {
        show = false;
      } else if (category === 'vegetables' && !['картофель', 'морковь', 'помидоры', 'огурцы'].some(f => name.includes(f))) {
        show = false;
      } else if (category === 'dairy' && !['молоко', 'сметана', 'творог', 'сыр'].some(f => name.includes(f))) {
        show = false;
      }

      if (price > maxPrice) show = false;

      prod.style.display = show ? 'block' : 'none';
    });
  });

 
  products.forEach(prod => {
    const stars = document.createElement('div');
    stars.className = 'stars';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.cursor = 'pointer';
      star.style.color = 'gray';
      star.addEventListener('click', () => {
        const allStars = stars.querySelectorAll('span');
        allStars.forEach((s, index) => {
          s.style.color = index < i ? 'gold' : 'gray';
        });
      });
      stars.append(star);
    }
    prod.append(stars);
  });

 
  let cartCount = 0;
  let cartTotal = 0;

  document.querySelectorAll('.product form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const priceText = form.parentElement.querySelector('.price').textContent;
      const price = parseInt(priceText);
      const qty = parseInt(form.querySelector('input').value);

      cartCount += qty;
      cartTotal += qty * price;

      const cartSummary = document.querySelector('h3 + .product');
      if (cartSummary) {
        cartSummary.querySelector('p:nth-child(1)').textContent = `Товаров в корзине: ${cartCount}`;
        cartSummary.querySelector('p:nth-child(2)').textContent = `Общая сумма: ${cartTotal} KZT`;
      }

      form.parentElement.style.backgroundColor = '#e0ffe0';
      form.parentElement.style.transform = 'scale(1.03)';
      setTimeout(() => {
        form.parentElement.style.transform = 'scale(1)';
        form.parentElement.style.backgroundColor = 'white';
      }, 500);
    });
  });
}
