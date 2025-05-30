// Countdown Timer
function updateCountdown() {
    // Set the launch date (30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    // If countdown reaches zero
    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
}

// Email Subscription Form
function handleEmailSubmission() {
    const emailForm = document.getElementById('emailForm');
    const messageElement = document.getElementById('message');
    const emailInput = document.getElementById('email');

    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value;

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate API call
        const button = emailForm.querySelector('button');
        const originalText = button.innerText;
        button.innerText = 'Subscribing...';
        button.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            // In a real application, you would send this to your backend
            console.log('Email subscription:', email);

            showMessage('Thank you! We\'ll notify you when we launch.', 'success');
            emailInput.value = '';
            button.innerText = originalText;
            button.disabled = false;
        }, 1500);
    });
}

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = text;
    messageElement.className = `mt-3 text-sm ${type === 'error' ? 'text-red-300' : 'text-green-300'}`;
    messageElement.classList.remove('hidden');

    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 5000);
}

// Floating animation for background elements
function initFloatingAnimation() {
    const particles = document.querySelectorAll('.absolute.w-96');

    particles.forEach((particle, index) => {
        let angle = 0;
        const speed = 0.5 + (index * 0.2);
        const radius = 20 + (index * 10);

        function animate() {
            angle += speed;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;

            particle.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    });
}

// Add hover effects to feature cards
function initHoverEffects() {
    const featureCards = document.querySelectorAll('.grid .glass-effect');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize email form
    handleEmailSubmission();

    // Initialize animations
    initFloatingAnimation();
    initHoverEffects();

    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add some keyboard shortcuts for fun
document.addEventListener('keydown', function(e) {
    // Press 'L' to trigger a launch effect
    if (e.key.toLowerCase() === 'l') {
        const logo = document.querySelector('h1');
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'slideUp 0.8s ease-out';
        }, 10);
    }

    // Press 'E' to focus email input
    if (e.key.toLowerCase() === 'e') {
        document.getElementById('email').focus();
    }
});

// Add parallax effect on scroll (if page becomes scrollable)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    document.querySelectorAll('.absolute.w-96').forEach(particle => {
        particle.style.transform += ` translateY(${rate}px)`;
    });
});
