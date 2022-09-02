

const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategory(data))
}

const displayNewsCategory = (news) => {
    console.log(news);
    console.log(news.data);
    const newsCategory = news.data.news_category;
    console.log(newsCategory);

    newsCategory.forEach(singleNewsCategory => {
        const categoryName = singleNewsCategory.category_name;
        console.log(categoryName);

        const displayCategory = document.getElementById('display-category');
        const aTag = document.createElement('a');
        aTag.innerHTML = `
        <a class="container mx-2" href="#">${categoryName}</a>
        `;
        displayCategory.appendChild(aTag);
    })
}


loadNews();