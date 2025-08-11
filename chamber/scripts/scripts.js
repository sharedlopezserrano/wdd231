import {discover} from "../data/discover.mjs";

function displayItems(discover) {
    const showHere = document.querySelector("#showHere");
    
    if (!showHere) {
        console.error("Element with ID 'showHere' not found");
        return;
    }
    
    showHere.style.minHeight = "800px";
    
    discover.forEach((x, index) => {
        const theblock = document.createElement("div")
        theblock.classList.add("block");
        theblock.style.animationDelay = `${index * 0.1}s`;
        
        const thephoto = document.createElement("img")
        thephoto.src = `images/${x["photo-link"]}`
        thephoto.alt = x.name
        thephoto.classList.add("block-image");
        thephoto.loading = "lazy";
        thephoto.onerror = function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="%23f9f9f9"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>';
            this.alt = 'Image not available';
        };
        theblock.appendChild(thephoto)

        const thetittle = document.createElement("h2")
        thetittle.innerText = x.name
        thetittle.classList.add("block-title");
        theblock.appendChild(thetittle)
        
        const theaddress = document.createElement("address")
        theaddress.innerText = x.industry
        theaddress.classList.add("block-industry");
        theblock.appendChild(theaddress)

        if (x.headquarters) {
            const headquarters = document.createElement("p")
            headquarters.innerText = x.headquarters
            headquarters.classList.add("block-headquarters");
            theblock.appendChild(headquarters)
        }

        const description = document.createElement("p")
        description.innerText = x.description
        description.classList.add("block-description");
        theblock.appendChild(description)

        const learnMoreBtn = document.createElement("button")
        learnMoreBtn.innerText = "Learn More"
        learnMoreBtn.classList.add("learn-more-btn");
        learnMoreBtn.addEventListener('click', () => {
            openCompanyModal(x);
        });
        theblock.appendChild(learnMoreBtn)

        showHere.appendChild(theblock)
    })   
    
    setTimeout(() => {
        showHere.style.minHeight = "auto";
    }, discover.length * 100 + 600);
}

function openCompanyModal(company) {
    const modal = document.getElementById('companyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = company.name;
    
    modalBody.innerHTML = `
        <div class="company-details">
            <div class="detail-item">
                <strong>Industry:</strong>
                <span>${company.industry}</span>
            </div>
            ${company.headquarters ? `
                <div class="detail-item">
                    <strong>Headquarters:</strong>
                    <span>${company.headquarters}</span>
                </div>
            ` : ''}
            ${company.employees ? `
                <div class="detail-item">
                    <strong>Employees:</strong>
                    <span>${company.employees.toLocaleString()}</span>
                </div>
            ` : ''}
            ${company.revenue_2024 || company.revenue_estimate ? `
                <div class="detail-item">
                    <strong>Revenue:</strong>
                    <span>${company.revenue_2024 || company.revenue_estimate}</span>
                </div>
            ` : ''}
            <div class="detail-item description">
                <strong>Description:</strong>
                <p>${company.description}</p>
            </div>
            ${company.notes ? `
                <div class="detail-item notes">
                    <strong>Additional Notes:</strong>
                    <p>${company.notes}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCompanyModal() {
    const modal = document.getElementById('companyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupModalEventListeners() {
    const modal = document.getElementById('companyModal');
    const closeBtn = document.querySelector('#companyModal .close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeCompanyModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCompanyModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeCompanyModal();
        }
    });
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupModalEventListeners();
        requestAnimationFrame(() => displayItems(discover));
    });
} else {
    setupModalEventListeners();
    requestAnimationFrame(() => displayItems(discover));
}

