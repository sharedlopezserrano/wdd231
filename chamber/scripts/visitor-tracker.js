function displayVisitorMessage() {
    const visitorMessageDiv = document.getElementById('visitor-message');
    
    if (!visitorMessageDiv) {
        return;
    }
    
    visitorMessageDiv.style.height = '0px';
    visitorMessageDiv.style.overflow = 'hidden';
    visitorMessageDiv.style.display = 'block';
    
    const currentDate = Date.now();
    const lastVisit = localStorage.getItem('lastVisitDate');
    let message = '';
    
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (timeDifference < 86400000) {
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    visitorMessageDiv.textContent = message;
    
    requestAnimationFrame(() => {
        visitorMessageDiv.style.height = 'auto';
        const height = visitorMessageDiv.offsetHeight;
        visitorMessageDiv.style.height = '0px';
        
        requestAnimationFrame(() => {
            visitorMessageDiv.style.transition = 'height 0.3s ease, opacity 0.3s ease';
            visitorMessageDiv.style.height = height + 'px';
            visitorMessageDiv.style.opacity = '1';
        });
    });
    
    localStorage.setItem('lastVisitDate', currentDate.toString());
    
    setTimeout(() => {
        visitorMessageDiv.style.opacity = '0';
        visitorMessageDiv.style.height = '0px';
        setTimeout(() => {
            visitorMessageDiv.style.display = 'none';
        }, 300);
    }, 5000);
}

function addCloseButton() {
    const visitorMessageDiv = document.getElementById('visitor-message');
    
    if (visitorMessageDiv) {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'visitor-message-close';
        closeButton.setAttribute('aria-label', 'Close visitor message');
        
        closeButton.addEventListener('click', () => {
            visitorMessageDiv.style.opacity = '0';
            setTimeout(() => {
                visitorMessageDiv.style.display = 'none';
            }, 300);
        });
        
        visitorMessageDiv.appendChild(closeButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayVisitorMessage();
    addCloseButton();
});
