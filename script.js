const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');
const headline = document.getElementById('headline')
const links = document.querySelectorAll('.nav-links li'); 

let previousMargin = '2rem 0'; 

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        previousMargin = headline.style.margin; // Store the previous margin
        headline.style.margin = '19rem 0 2rem 0'; // Set new margin when active
    } else {
        headline.style.margin = previousMargin; // Revert to previous margin when inactive
    }
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        headline.style.margin = previousMargin;
    });
});

function fetchNews(category) {
    const apiKey = '8e649c67d54743799f9843e9b1d7e07c';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=30&apiKey=${apiKey}`;

    let headlines = document.getElementById("headline")
headlines.innerText = `Daily News - Top ${category} headlines`

const newsContainer = document.getElementById('newsContainer');
newsContainer.innerHTML = '<img class="gif" src="assets/loader.gif">';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the retrieved data and display news content
            displayNews(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

// Function to display news content in the app
function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    const row = document.createElement('div');
    row.classList.add('row');

    articles.forEach((article, index) => {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-6' , 'col-md-6', 'col-lg-4');

        const cardTemplate = `
            <div class="card mt-4">
                <div class="card-body">
                    <img src="${article.urlToImage?article.urlToImage:"assets/nodp.png"}" class="card-img-top" alt="${article.title}"  height="200px">
                    <h5 class="card-title">${article.title.slice(0,50)}..</h5>
                    <p class="card-text">${article.description?article.description.slice(0,150):'No description available.'}...</p>
                    <p class="card-author">Author: ${article.author?article.author:'No Author found'}  on ${new Date(article.publishedAt).toGMTString()}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        `;

        colDiv.innerHTML = cardTemplate;
        row.appendChild(colDiv);
    });
    newsContainer.appendChild(row);

}
fetchNews('sports');
