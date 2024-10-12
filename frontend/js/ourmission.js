
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

// Gradient background
function updateGradient() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    const startColor = [0, 0, 0]; // Black
    const endColor = [255, 255, 255]; // White

    const currentColor = startColor.map((start, index) => {
        return Math.round(start + (endColor[index] - start) * scrollPercentage);
    });

    document.getElementById('gradient-bg').style.background = `linear-gradient(to bottom, rgb(${startColor.join(',')}), rgb(${currentColor.join(',')}))`;
    
    // Update nav background
    const nav = document.querySelector('nav');
    nav.style.background = `linear-gradient(to right, rgba(${startColor.join(',')}, 0.8), rgba(${currentColor.join(',')}, 0.8))`;
}

window.addEventListener('scroll', updateGradient);
updateGradient(); // Initial call