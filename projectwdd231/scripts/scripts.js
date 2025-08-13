import {games} from "../data/games.mjs";

function displayItems(gamesData) {
    const showHere = document.querySelector("#showHere");
    
    if (!showHere) {
        console.error("Element with ID 'showHere' not found");
        return;
    }
    
    showHere.style.minHeight = "800px";
    
    gamesData.forEach((x, index) => {
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
        theaddress.innerText = x.category
        theaddress.classList.add("block-category");
        theblock.appendChild(theaddress)

        if (x.era) {
            const era = document.createElement("p")
            era.innerText = x.era
            era.classList.add("block-era");
            theblock.appendChild(era)
        }

        const description = document.createElement("p")
        description.innerText = x.description
        description.classList.add("block-description");
        theblock.appendChild(description)

        const learnMoreBtn = document.createElement("button")
        learnMoreBtn.innerText = "Check Here"
        learnMoreBtn.classList.add("learn-more-btn");
        learnMoreBtn.addEventListener('click', () => {
            openGameModal(x);
        });
        theblock.appendChild(learnMoreBtn)

        showHere.appendChild(theblock)
    })   
    
    setTimeout(() => {
        showHere.style.minHeight = "auto";
    }, gamesData.length * 100 + 600);
}

function openGameModal(game) {
    const modal = document.getElementById('companyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = game.name;
    
    modalBody.innerHTML = `
        <div class="game-details">
            <div class="detail-item">
                <strong>Category:</strong>
                <span>${game.category}</span>
            </div>
            ${game.era ? `
                <div class="detail-item">
                    <strong>Era:</strong>
                    <span>${game.era}</span>
                </div>
            ` : ''}
            ${game.popular_games ? `
                <div class="detail-item">
                    <strong>Popular Games:</strong>
                    <span>${game.popular_games.join(', ')}</span>
                </div>
            ` : ''}
            <div class="detail-item description">
                <strong>Description:</strong>
                <p>${game.description}</p>
            </div>
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupModalEventListeners();
        requestAnimationFrame(() => displayItems(games));
    });
} else {
    setupModalEventListeners();
    requestAnimationFrame(() => displayItems(games));
}

