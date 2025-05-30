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
        button.innerText = 'Joining...';
        button.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            // In a real application, you would send this to your backend
            console.log('Email subscription:', email);

            showMessage('Thank you! You\'ve been added to our waitlist.', 'success');
            emailInput.value = '';
            button.innerText = originalText;
            button.disabled = false;
        }, 1500);
    });
}

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = text;
    messageElement.className = `text-sm ${type === 'error' ? 'text-red-400' : 'text-green-400'}`;
    messageElement.classList.remove('hidden');

    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize email form
    handleEmailSubmission();

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

// Simple keyboard shortcut for email focus
document.addEventListener('keydown', function(e) {
    // Press 'E' to focus email input
    if (e.key.toLowerCase() === 'e' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const emailInput = document.getElementById('email');
        if (emailInput && document.activeElement !== emailInput) {
            emailInput.focus();
            e.preventDefault();
        }
    }
});
