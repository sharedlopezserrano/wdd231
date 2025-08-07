document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formDataDiv = document.getElementById('form-data');

    if (formDataDiv) {
        let formDataHTML = '<div class="form-data-grid">';
        const lastName = urlParams.get('last-name');
        const email = urlParams.get('email');
        const mobile = urlParams.get('mobile');
        const businessName = urlParams.get('business-name');
        const membershipLevel = urlParams.get('membership-level');
        const timestamp = urlParams.get('timestamp');

        if (firstName) {
            formDataHTML += `<div class="data-item"><strong>First Name:</strong> ${firstName}</div>`;
        }
        
        if (lastName) {
            formDataHTML += `<div class="data-item"><strong>Last Name:</strong> ${lastName}</div>`;
        }
        
        if (email) {
            formDataHTML += `<div class="data-item"><strong>Email:</strong> ${email}</div>`;
        }
        
        if (mobile) {
            formDataHTML += `<div class="data-item"><strong>Mobile Phone:</strong> ${mobile}</div>`;
        }
        
        if (businessName) {
            formDataHTML += `<div class="data-item"><strong>Business/Organization:</strong> ${businessName}</div>`;
        }
        
        if (membershipLevel) {
            formDataHTML += `<div class="data-item"><strong>Membership Level:</strong> ${membershipLevel}</div>`;
        }
        
        if (timestamp) {
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
            formDataHTML += `<div class="data-item"><strong>Application Date:</strong> ${formattedDate}</div>`;
        }

        formDataHTML += '</div>';
        formDataDiv.innerHTML = formDataHTML;
    }

    const hamburger = document.getElementById('ham-btn');
    const navigation = document.getElementById('nav-bar');

    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navigation.classList.toggle('open');
        });
    }
    const lastModified = document.getElementById('last-modified');
    if (lastModified) {
        lastModified.textContent = `Last modified: ${document.lastModified}`;
    }
});
