document.addEventListener("DOMContentLoaded", () => {
    const articles = [
        {
            title: "AI is Changing the World",
            category: "technology",
            content: "Artificial Intelligence is revolutionizing industries...",
            img: "image6.jpg"
        },
        {
            title: "Football World Cup Highlights",
            category: "sports",
            content: "Latest football scores and player performances...",
            img: "image5.jpg"
        },
        {
            title: "New Blockbuster Movie Released",
            category: "entertainment",
            content: "Hollywood's latest action thriller has fans excited...",
            img: "image4.jpg"
        },
        {
            title: "Celebrity Music Album Drops",
            category: "entertainment",
            content: "A famous singer just dropped a surprise album...",
            img: "image3.jpg"
        },
        {
            title: "Latest Space Discoveries",
            category: "latest",
            content: "Scientists have made a groundbreaking discovery...",
            img: "image2.jpg"
        }
    ];

    function loadArticles(category = null) {
        const articleList = document.querySelector(".article-list");
        articleList.innerHTML = "";
        const filteredArticles = category ? articles.filter(a => a.category === category) : articles;
        filteredArticles.forEach(article => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = `
                <img src="${article.img}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${article.content}</p>
            `;
            articleList.appendChild(articleElement);
        });
    }

    document.querySelectorAll(".category").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            loadArticles(e.target.dataset.category);
        });
    });

    document.querySelector("#search").addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchText) || 
            article.content.toLowerCase().includes(searchText)
        );
        loadArticles();
        document.querySelector(".article-list").innerHTML = "";
        filteredArticles.forEach(article => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = `
                <img src="${article.img}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${article.content}</p>
            `;
            document.querySelector(".article-list").appendChild(articleElement);
        });
    });

    loadArticles();
});
