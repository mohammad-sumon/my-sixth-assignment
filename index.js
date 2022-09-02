

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
        const categoryId = singleNewsCategory.category_id;
        console.log(categoryId);

        const displayCategory = document.getElementById('display-category');
        const aTag = document.createElement('a');
        aTag.innerHTML = `
        <a class="container mx-2" href="#" onclick="loadCategoryItems('${categoryId}')">${categoryName}</a>
        `;
        displayCategory.appendChild(aTag);
    })
}

const loadCategoryItems = (categoryId) => {
    console.log('clicked category', categoryId);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryItems(data))
}

const displayCategoryItems = (data) => {
    const allData = data.data;

    allData.forEach(singleData => {
        console.log(singleData);

        const categoryContainer = document.getElementById('category-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row g-3 p-3 shadow border my-3">
            <div class="col-md-4 my-3">
            <img src="${singleData.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${singleData.title}</h5>
                <p class="card-text" style="height: 150px; border:1px solid red; overflow: hidden; text-overflow: ellipsis;">${singleData.details}</p>
                <div class="card-text d-flex mx-5">
                <div>
                    <img src="#" alt="" />
                    <h3>Jane Cooper</h3>
                </div>
                <div>View</div>
                <div>btn</div>
                </div>
            </div>
            </div>
        </div>
        `;
        categoryContainer.appendChild(div);
    })
}
loadNews();