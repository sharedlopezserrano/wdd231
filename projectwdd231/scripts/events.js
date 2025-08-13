async function loadEvents() {
  try {
    const response = await fetch('data/events.json');
    if (response.ok) {
      const events = await response.json();
      displayEvents(events.slice(0, 3));
    } else {
      console.error('Failed to load events');
      displayFallbackEvents();
    }
  } catch (error) {
    console.error('Error loading events:', error);
    displayFallbackEvents();
  }
}

function displayEvents(events) {
  const eventsContainer = document.querySelector('#events-list');
  if (!eventsContainer) return;

  const eventsHTML = events.map(event => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return `
      <div class="event-item">
        <div class="event-date">${formattedDate}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-description">${event.description}</div>
      </div>
    `;
  }).join('');

  eventsContainer.innerHTML = eventsHTML;
}

function displayFallbackEvents() {
  const fallbackEvents = [
    {
      title: "Chamber Networking Breakfast",
      date: "2024-01-15",
      description: "Join fellow business leaders for networking and coffee."
    },
    {
      title: "Small Business Workshop", 
      date: "2024-01-22",
      description: "Learn essential skills for growing your small business."
    },
    {
      title: "Annual Chamber Gala",
      date: "2024-02-10", 
      description: "Celebrate our community's achievements at our annual gala."
    }
  ];
  displayEvents(fallbackEvents);
}

document.addEventListener('DOMContentLoaded', loadEvents);
