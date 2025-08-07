document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modals = document.querySelectorAll('.modal');
    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close');

    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('tabindex', '-1');
                modal.focus();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });

    const hamburger = document.getElementById('ham-btn');
    const navigation = document.getElementById('nav-bar');

    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navigation.classList.toggle('open');
        });
    }

    const form = document.querySelector('.membership-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const orgTitle = document.getElementById('org-title');
            if (orgTitle.value && !orgTitle.checkValidity()) {
                event.preventDefault();
                alert('Organizational title must be at least 7 characters and contain only letters, spaces, and hyphens.');
                orgTitle.focus();
                return false;
            }
        });
    }

    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const lastModified = document.getElementById('last-modified');
    if (lastModified) {
        lastModified.textContent = `Last modified: ${document.lastModified}`;
    }
});
