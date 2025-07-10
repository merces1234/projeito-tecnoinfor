    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Impede o formulário de recarregar a página

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulação de credenciais
      const userValido = "usuario";
      const senhaValida = "1234";

      if (username === userValido && password === senhaValida) {
       window.location.href = "pagina-inicial.html";
        // Redireciona ou exibe conteúdo
      } else {
        alert("Usuário ou senha incorretos.");
      }
    });

    const canvas = document.getElementById('tech-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;
const maxDistance = 120;
const mouseRadius = 150;

const mouse = {
  x: null,
  y: null
};

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'cyan';
    ctx.shadowColor = 'aqua';
    ctx.shadowBlur = 10;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote nas bordas
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Interação com o mouse
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        let angle = Math.atan2(dy, dx);
        let force = (mouseRadius - distance) / mouseRadius;
        let moveX = Math.cos(angle) * force * 4;
        let moveY = Math.sin(angle) * force * 4;

        this.x -= moveX;
        this.y -= moveY;
      }
    }

    this.draw();
  }
}

// Cria partículas
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  // Preenche o fundo com preto
  ctx.fillStyle = "#051626";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.update();
  }

  connectParticles();

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
