const menuData = [
  {
    id: 1,
    name: "Power-Up Pizza",
    category: "Main Dishes",
    price: "$14.99",
    description: "Classic margherita pizza with extra cheese boost",
    dietary: ["vegetarian"]
  },
  {
    id: 2,
    name: "Boss Battle Burger",
    category: "Main Dishes", 
    price: "$16.99",
    description: "Epic double beef burger with special sauce and fries",
    dietary: []
  },
  {
    id: 3,
    name: "Health Potion Smoothie",
    category: "Beverages",
    price: "$7.99",
    description: "Refreshing berry smoothie that restores your energy",
    dietary: ["vegan", "gluten-free"]
  },
  {
    id: 4,
    name: "Coin Collector Nachos",
    category: "Appetizers",
    price: "$9.99",
    description: "Golden nachos with cheese, jalapeños, and dips",
    dietary: ["vegetarian"]
  },
  {
    id: 5,
    name: "Respawn Ramen",
    category: "Main Dishes",
    price: "$13.99",
    description: "Hearty ramen bowl that brings you back to life",
    dietary: []
  },
  {
    id: 6,
    name: "Mana Mocktail",
    category: "Beverages",
    price: "$6.99",
    description: "Blue raspberry mocktail that restores your mana",
    dietary: ["vegan"]
  }
];

function displayMenuItems(items) {
  const menuGrid = document.getElementById('menu-grid');
  
  if (items.length === 0) {
    menuGrid.innerHTML = '<p>No menu items found.</p>';
    return;
  }

  const menuHTML = items.map(item => `
    <div class="menu-card">
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p class="category">${item.category}</p>
        <p class="price">${item.price}</p>
        <p class="description">${item.description}</p>
        ${item.dietary.length > 0 ? `<div class="dietary-tags">${item.dietary.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
      </div>
    </div>
  `).join('');

  menuGrid.innerHTML = menuHTML;
}

function filterByCategory(category) {
  if (category === 'all') {
    displayMenuItems(menuData);
  } else {
    const filtered = menuData.filter(item => item.category === category);
    displayMenuItems(filtered);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayMenuItems(menuData);
  const categories = ['all', ...new Set(menuData.map(item => item.category))];
});
