// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded',function(){initializeMap();initScrollToTop();initSaveTheDate();});
/// --- 1. Interactive Map Setup (Leaflet) ---
function initializeMap() {
    // Approximate coordinates for Meadows Community Centre, Cambridge
    const centreCoords = [52.230463, 0.119092]; // Updated to use the coordinates from your older script.js
    const zoomLevel = 19; // High zoom for street view

    // Initialize the map
    const map = L.map('map').setView(centreCoords, zoomLevel);

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a pink castle marker
    const princessIcon = L.divIcon({
        className: 'princess-icon',
        html: '<div style="font-size: 30px; color: #be9d06ff; text-shadow: 1px 1px #FFF;">🏰</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
    
    L.marker(centreCoords, { icon: princessIcon }).addTo(map)
        .bindPopup('<b>Meadows Community Centre</b><br>Venue for the Royal Ball!')
        .openPopup();

    setTimeout(() => { 
        map.invalidateSize(); 
        map.setView(centreCoords, zoomLevel);
    }, 50); 
    
    // Handle map resize on mobile orientation change
    window.addEventListener('resize', () => { map.invalidateSize(); });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    const screen = document.querySelector('.screen');

    scrollButton.addEventListener('click', function() {
        screen.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Save the Date - Download ICS file
function initSaveTheDate() {
    const saveLink = document.getElementById('saveDate');

    saveLink.addEventListener('click', function(e) {
        e.preventDefault();
        downloadICS();
    });
}

function downloadICS() {
    // Event details
    const event = {
        title: "Ada's Princess Ball",
        description: "You are cordially invited to attend Ada's princess ball. Entertainment includes soft play, crafts table, disco, snacks, and drinks. Dress code: Please wear your fanciest dress. No need to bring gifts!",
        location: "Meadows Community Centre",
        start: new Date('2025-12-20T10:30:00'),
        end: new Date('2025-12-20T12:30:00')
    };

    // Format dates for ICS (YYYYMMDDTHHMMSS)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };

    const now = new Date();
    const timestamp = formatDate(now);

    // Create ICS content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Ada\'s Princess Ball//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `DTSTAMP:${timestamp}`,
        `UID:${timestamp}@princessball`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Ada\'s Princess Ball tomorrow!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'adas-princess-ball.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

