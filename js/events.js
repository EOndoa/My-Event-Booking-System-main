document.addEventListener('DOMContentLoaded', function () {
    const eventsContainer = document.getElementById('events-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const noEventsMessage = document.getElementById('no-events-message');

    // Get references to filter/search elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const locationFilter = document.getElementById('locationFilter');
    const dateFilter = document.getElementById('dateFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    const API_BASE_URL = 'http://localhost/My-Event-Booking-System-main/api/events/get_events.php';

    async function fetchEvents() {
        // Reset messages and content
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        noEventsMessage.style.display = 'none';
        eventsContainer.innerHTML = '';

        // Gather filter values
        const params = new URLSearchParams();
        const searchText = searchInput.value.trim();
        const selectedLocation = locationFilter.value;
        const selectedDate = dateFilter.value;
        const selectedCategory = categoryFilter.value;

        if (searchText) params.append('search', searchText);
        if (selectedLocation && selectedLocation !== 'all' && selectedLocation !== 'Filter by Location') {
            params.append('location', selectedLocation);
        }
        if (selectedDate) params.append('date', selectedDate);
        if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'Filter by Category') {
            params.append('category', selectedCategory);
        }

        const fullApiUrl = `${API_BASE_URL}?${params.toString()}`;
        console.log("Fetching from:", fullApiUrl);

        try {
            const response = await fetch(fullApiUrl);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            loadingMessage.style.display = 'none';

            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(event => {
                    const eventCardHtml = `
