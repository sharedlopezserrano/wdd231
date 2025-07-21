async function loadSpotlights() {
  try {
    const response = await fetch('data/companies.json');
    if (response.ok) {
      const companies = await response.json();
      // Filter for gold and silver members only
      const eligibleCompanies = companies.filter(company => 
        company.membershipLevel === 'Gold' || company.membershipLevel === 'Silver'
      );
      
      // Randomly select 2-3 companies
      const numberOfSpotlights = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const selectedCompanies = getRandomCompanies(eligibleCompanies, numberOfSpotlights);
      displaySpotlights(selectedCompanies);
    } else {
      console.error('Failed to load company spotlights');
      displayFallbackSpotlights();
    }
  } catch (error) {
    console.error('Error loading company spotlights:', error);
    displayFallbackSpotlights();
  }
}

function getRandomCompanies(companies, count) {
  const shuffled = companies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displaySpotlights(companies) {
  const spotlightsContainer = document.querySelector('#spotlights-grid');
  if (!spotlightsContainer) return;

  const spotlightsHTML = companies.map(company => {
    return `
      <div class="spotlight-card">
        <div class="spotlight-img">
          <img src="${company.image}" alt="${company.name}" onerror="this.src='images/placeholder.jpg'">
        </div>
        <div class="spotlight-info">
          <h3>${company.name}</h3>
          <p class="spotlight-tagline">${company.tagline}</p>
          <p class="spotlight-description">${company.description}</p>
          <div class="spotlight-contact">
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Website:</strong> <a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.website}</a></p>
          </div>
          <div class="membership-badge ${company.membershipLevel.toLowerCase()}">${company.membershipLevel} Member</div>
        </div>
      </div>
    `;
  }).join('');

  spotlightsContainer.innerHTML = spotlightsHTML;
}

function displayFallbackSpotlights() {
  const spotlightsContainer = document.querySelector('#spotlights-grid');
  if (!spotlightsContainer) return;

  spotlightsContainer.innerHTML = `
    <div class="spotlight-card">
      <div class="spotlight-info">
        <h3>Unable to load spotlights</h3>
        <p>Please refresh the page to try again.</p>
      </div>
    </div>
  `;
}

// Load spotlights when the page loads
document.addEventListener('DOMContentLoaded', loadSpotlights);