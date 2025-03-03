document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hamburger Menu Toggle
    const header = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');

    menuBtn.addEventListener('click', () => {
        header.classList.toggle('open');
        menuBtn.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('open');
            menuBtn.classList.remove('open');
        });
    });

    // Custom Particle Animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Particle constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Interaction with mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = 100 / distance;

            if (distance < 100) {
                this.x += (dx / distance) * force;
                this.y += (dy / distance) * force;
            }
        }

        draw() {
            ctx.fillStyle = '#FFC1CC'; // Soft Pink
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    // Mouse movement
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    init();
    animate();

    // About timeline animation
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.milestone').forEach(m => {
            if (m.getBoundingClientRect().top < window.innerHeight * 0.8) {
                m.classList.add('visible');
            }
        });
    });
});
