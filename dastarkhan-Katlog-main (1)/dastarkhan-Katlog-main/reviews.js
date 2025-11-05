document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = this.querySelector('input').value.trim();
  const rating = this.querySelector('#rating').value;
  const text = this.querySelector('textarea').value.trim();

  if (!name || !text) return alert("Заполните все поля!");

  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = `
    <h3>${name}</h3>
    <p class="stars">${rating}</p>
    <p>${text}</p>
  `;

  const list = document.getElementById("reviewsslist");
  list.appendChild(card);
  this.reset();

  
  card.style.opacity = "0";
  card.style.transform = "scale(0.9)";
  setTimeout(() => {
    card.style.transition = "all 0.4s ease";
    card.style.opacity = "1";
    card.style.transform = "scale(1)";
  }, 50);


  const counter = document.getElementById("counter");
  let count = document.querySelectorAll(".review-card").length;
  counter.textContent = count;
});



let currentMode = localStorage.getItem("mode") || "light";
$("body").toggleClass("dark-mode", currentMode === "dark");

$("#themeToggle").click(function(){
  $("body").toggleClass("dark-mode");
  let newMode = $("body").hasClass("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", newMode);
});
