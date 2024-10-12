
// Particle effect
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 200;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateParticles();

// Replace the animateGradient function with this new one
function animateGradient() {
    const gradientBg = document.getElementById('gradient-bg');
    let progress = 0;
    let direction = 1;

    function updateGradient() {
        progress += 0.005 * direction;

        if (progress > 1 || progress < 0) {
            direction *= -1;
        }

        const color1 = 'hsl(0, 0%, 10%)';  // Light black
        const color2 = 'hsl(0, 0%, 50%)';  // Grey
        const color3 = 'hsl(0, 0%, 90%)';  // Almost white

        gradientBg.style.background = `linear-gradient(
            135deg,
            ${color1} ${progress * 100}%,
            ${color2} ${(progress + 0.5) * 100}%,
            ${color3} ${(progress + 1) * 100}%
        )`;

        requestAnimationFrame(updateGradient);
    }

    updateGradient();
}

animateGradient();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
