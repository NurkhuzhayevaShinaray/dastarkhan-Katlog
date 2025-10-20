document.getElementById("deliveryForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  let errors = [];

  if (name === "") errors.push("Введите имя");
  if (address === "") errors.push("Введите адрес");
  if (phone === "" || !/^\+?\d{10,13}$/.test(phone)) errors.push("Введите корректный телефон");
  if (email === "" || !email.includes("@")) errors.push("Введите корректный email");

  if (errors.length > 0) {
    message.style.color = "red";
    message.textContent = errors.join(", ");
  } else {
    message.style.color = "green";
    message.textContent = "Спасибо! Ваша заявка отправлена.";
    document.getElementById("deliveryForm").reset();
  }
});
//a
//a


const sumInput = document.getElementById("sum");
const costDisplay = document.getElementById("cost");

const deliveryOptions = [
  { min: 0, max: 5000, cost: 1000 },
  { min: 5000, max: 10000, cost: 500 },
  { min: 10000, max: Infinity, cost: 0 }
];

sumInput.addEventListener("input", () => {
  const sum = Number(sumInput.value);
  let deliveryCost = 0;

  for (let option of deliveryOptions) {
    if (sum >= option.min && sum < option.max) {
      deliveryCost = option.cost;
      break;
    }
  }

  costDisplay.textContent =
    deliveryCost === 0
      ? "фБесплатная доставка"
      : `Стоимость доставки: ${deliveryCost} ₸`;
});

