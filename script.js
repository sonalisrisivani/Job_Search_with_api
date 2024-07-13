document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
    const locationInput = document.getElementById('locationInput').value.trim();
    if (searchInput === '') return;

    const appId = '8b08337d'; // Your Adzuna application ID
    const appKey = '732adbab8c05ccb0425581241a832428'; // Your Adzuna application key
    let apiUrl = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${searchInput}`;

    if (locationInput) {
        apiUrl += `&where=${locationInput}`;
    }

    console.log('API URL:', apiUrl); // Log the API URL for debugging

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                displayJobListings(data.results);
            } else {
                document.getElementById('jobListings').innerHTML = '<p>No job listings found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching job listings:', error);
            document.getElementById('jobListings').innerHTML = '<p>Error fetching job listings. Please try again later.</p>';
        });
});

function displayJobListings(jobs) {
    const jobListings = document.getElementById('jobListings');
    jobListings.innerHTML = ''; // Clear previous listings

    jobs.forEach(job => {
        const jobHTML = `
            <div class="job-listing">
                <h2>${job.title}</h2>
                <p>${job.company.display_name}</p>
                <p>${job.location.display_name}</p>
                <p>${job.contract_time}</p>
                <a href="${job.redirect_url}" target="_blank">Apply</a>
            </div>
        `;
        jobListings.innerHTML += jobHTML;
    });
}
