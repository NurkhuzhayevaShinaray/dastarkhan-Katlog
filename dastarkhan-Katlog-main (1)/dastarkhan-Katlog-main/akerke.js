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


const themeBtn = document.getElementById('toggleTheme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode')
    ? 'Светлая тема'
    : 'Темная тема';
});





const stars = document.querySelectorAll('#rating span');
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    stars.forEach((s, i) => s.classList.toggle('active', i <= index));
    playSound('click');
  });
});


document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
  }
});

const showTimeBtn = document.getElementById('showTimeBtn');
const currentTime = document.getElementById('currentTime');
showTimeBtn.addEventListener('click', () => {
  const now = new Date().toLocaleTimeString();
  currentTime.textContent = `Текущее время: ${now}`;
  playSound('ding');
});


document.addEventListener('keydown', (event) => {
  let msg = '';
  switch (event.key.toLowerCase()) {
    case 't':
      msg = 'Вы нажали T — переключаем тему!';
      document.body.classList.toggle('dark-mode');
      break;
    case 'r':
      msg = 'Вы нажали R — сбрасываем рейтинг!';
      stars.forEach(s => s.classList.remove('active'));
      break;
    default:
      msg = `Клавиша "${event.key}" не имеет действия.`;
  }
  console.log(msg);
});

function playSound(type) {
  const sounds = {
    click: new Audio('sounds/click.mp3'),
    ding: new Audio('sounds/ding.mp3')
  };
  if (sounds[type]) sounds[type].play();
}


document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.3)';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1)';
  });
});


function updateDateTime() {
  const now = new Date().toLocaleString();
  document.getElementById('datetime').textContent = now;
}
setInterval(updateDateTime, 1000);
updateDateTime();

const audio = new Audio("/ICEGERGERT & SKY RAE - Наследство.mp3");
const playBtn = document.getElementById("playBtn");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "Pause ⏸️";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "Play 🎵";
    isPlaying = false;
  }
});


audio.addEventListener("ended", () => {
  playBtn.textContent = "Play 🎵";
  isPlaying = false;
});




const submitBtn = document.getElementById('submitName');
const nameInput = document.getElementById('nameInput');
const greetingText = document.getElementById('greetingText');

submitBtn.addEventListener('click', () => {
  
  const userName = nameInput.value.trim();
  if (userName === "") {
    alert("Пожалуйста, введите ваше имя");
    return;
  }

  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Пожалуйста, подождите...';

  
  setTimeout(() => {
    
    submitBtn.innerHTML = 'Отправлено!';
    greetingText.textContent = `Здравствуйте, ${userName}!`;
    

    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить';
      nameInput.value = '';
    }, 1500); 
  }, 2000); 
});