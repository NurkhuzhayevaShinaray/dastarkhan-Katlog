document.addEventListener("DOMContentLoaded", () => {

  const details = document.querySelectorAll("details");
  details.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        details.forEach((el) => {
          if (el !== item) el.removeAttribute("open");
        });
      }
    });
  });

 
  function updateDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = now.toLocaleString("en-US", options);
    const dateElement = document.getElementById("datetime");
    if (dateElement) {
      dateElement.textContent = `Current Date & Time: ${formattedDate}`;
    }
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

 
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const themeBtn = document.getElementById("toggleTheme");

  let currentMode = localStorage.getItem("mode") || "light";
  if (currentMode === "dark") {
    body.classList.add("dark-mode");
    if (header) header.style.backgroundColor = "#1a1a1a";
    if (footer) footer.style.backgroundColor = "#1a1a1a";
    updateDetailsDarkMode(true);
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  }
  updateThemeIcon();

  function updateDetailsDarkMode(isDark) {
    const bg = isDark ? "rgba(30,30,30,0.8)" : "rgba(0,0,0,0.6)";
    const textColor = isDark ? "#f0f0f0" : "#fff";
    details.forEach((d) => {
      d.style.background = bg;
      d.querySelector("summary").style.color = "#ffd700";
      d.querySelector("p").style.color = textColor;
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");
      if (header) header.style.backgroundColor = isDark ? "#1a1a1a" : "darkgreen";
      if (footer) footer.style.backgroundColor = isDark ? "#1a1a1a" : "darkgreen";

      updateDetailsDarkMode(isDark);

      localStorage.setItem("mode", isDark ? "dark" : "light");
      updateThemeIcon();
    });
  }


  document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => { icon.style.transform = "scale(1.3)"; });
    icon.addEventListener("mouseleave", () => { icon.style.transform = "scale(1)"; });
  });

  
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      body.style.backgroundColor = randomColor;
    }
  });

  
  const submitBtn = document.getElementById("submitName");
  const nameInput = document.getElementById("nameInput");
  const greetingText = document.getElementById("greetingText");

  if (submitBtn && nameInput && greetingText) {
    submitBtn.addEventListener("click", () => {
      const userName = nameInput.value.trim();
      if (userName === "") { alert("Пожалуйста, введите ваше имя"); return; }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Пожалуйста, подождите...';

      setTimeout(() => {
        submitBtn.innerHTML = "Отправлено!";
        greetingText.textContent = `Здравствуйте, ${userName}!`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Отправить";
          nameInput.value = "";
        }, 1500);
      }, 2000);
    });
  }

  
  const showTimeBtn = document.getElementById("showTimeBtn");
  const currentTime = document.getElementById("currentTime");
  if (showTimeBtn && currentTime) {
    showTimeBtn.addEventListener("click", () => {
      currentTime.textContent = `Текущее время: ${new Date().toLocaleTimeString()}`;
    });
  }


  const stars = document.querySelectorAll("#rating span");
  if (stars.length) {
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        stars.forEach((s, i) => s.classList.toggle("active", i <= index));
      });
    });
  }
});
