const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 550;

const mouse = {
    x: null,
    y: null,
    radius: 120
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() * 0.2) - 0.1;
        this.speedY = (Math.random() * 0.2) - 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#C4D4E0';
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const size = 2; // Smaller dots for web effect
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, size));
    }
}

function connectParticles() {
    let mouseNearbyParticles = [];

    for (let a = 0; a < particlesArray.length; a++) {
        const particleA = particlesArray[a];

        for (let b = a + 1; b < particlesArray.length; b++) {
            const particleB = particlesArray[b];
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
                ctx.strokeStyle = 'rgba(196, 212, 224, 0.1)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        }

        const dx = particleA.x - mouse.x;
        const dy = particleA.y - mouse.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);

        if (mouseDistance < mouse.radius) {
            mouseNearbyParticles.push(particleA);
            ctx.strokeStyle = 'rgba(196, 212, 224, 0.2)';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }

    for (let i = 0; i < mouseNearbyParticles.length; i++) {
        for (let j = i + 1; j < mouseNearbyParticles.length; j++) {
            const particleA = mouseNearbyParticles[i];
            const particleB = mouseNearbyParticles[j];
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 60) {
                ctx.strokeStyle = 'rgba(196, 212, 224, 0.3)';
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
