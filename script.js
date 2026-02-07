document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgMusic');
  const body = document.getElementById('body');

  // Пытаемся проиграть сразу (иногда работает)
  audio.play().catch(() => {
    // Если не получилось — ждём клик
    const unlockAudio = () => {
      audio.play().then(() => {
        body.removeEventListener('click', unlockAudio);
        body.removeEventListener('touchstart', unlockAudio);
      }).catch(e => console.warn("Не удалось запустить аудио:", e));
    };

    body.addEventListener('click', unlockAudio);
    body.addEventListener('touchstart', unlockAudio);
  });

  // Запуск частиц
  initParticles();
});
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 120;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = Math.random() * 0.7 + 0.3; // медленно падает
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}