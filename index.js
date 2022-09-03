

const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategory(data))
    .catch(error => console.log(error))
}

const displayNewsCategory = (news) => {
    // console.log(news);
    // console.log(news.data);
    const newsCategory = news.data.news_category;
    // console.log(newsCategory);

    newsCategory.forEach(singleNewsCategory => {
        const categoryName = singleNewsCategory.category_name;
        // console.log(categoryName);
        const categoryId = singleNewsCategory.category_id;
        // console.log(categoryId);

        const displayCategory = document.getElementById('display-category');
        const aTag = document.createElement('a');
        aTag.innerHTML = `
        <a class="container mx-2" href="#" onclick="loadCategoryItems('${categoryId}')">${categoryName}</a>
        `;
        displayCategory.appendChild(aTag);

    })

}

// spinner
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

const loadCategoryItems = (categoryId) => {
    // console.log('clicked category', categoryId);

    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryItems(data))
    .catch(error => console.log(error))
}

const displayCategoryItems = (data) => {
    const allData = data.data;
    // console.log(allData.length);

    // nubmer display section
    const numberDisplay = document.getElementById('number-display');
    numberDisplay.value = `${allData.length}` + ' items found.' ?  `${allData.length}` + ' items found for this Category' : 'No Items Found';

    allData.forEach(singleData => {
        console.log(singleData);
        // console.log(singleData.length);

        const categoryContainer = document.getElementById('category-container');
        // categoryContainer.innerText = '';

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row g-0 p-3 shadow text-center">
            <div class="col-md-4">
                <img src="${singleData.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${singleData.title ? singleData.title : 'No Result Found'}</h5>
                    <div class="ellipsis-div">
                    <p class="p-1">${singleData.details}</p>
                    </div>
                    <div class="card-text d-flex justify-content-between">
                        <div class="d-flex">
                            <img src="${singleData.author.img}" alt="" style="width: 50px" class="rounded-circle" />
                            <h3>${singleData.author.name ? singleData.author.name : 'No Result Found'}</h3>
                        </div>
                        <div><i class="fa-solid fa-eye"></i> ${singleData.total_view ? singleData.total_view : 'No Result Found'}</div>
                        <div><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" onclick="loadCategoryDetails('${singleData._id}')">Details</button></div> 
                    </div>
                </div>
            </div>
        </div>
        `;
        categoryContainer.appendChild(div);
        
        
    });

    toggleSpinner(false);
}

const loadCategoryDetails = (_id) => {
    // console.log(_id);
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryDetails(data))
    .catch(error => console.log(error))
}

const displayCategoryDetails = (data) => {
    console.log(data);
    const dataIndex = data.data[0];

    // const modalTitle = document.getElementById('exampleModalLabel');
    // modalTitle.innerText = dataIndex.author.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
        <img src="${dataIndex.thumbnail_url ? dataIndex.thumbnail_url : "No Image Found"}">
        <p>Title: ${dataIndex.title ? dataIndex.title : "No Data Available"}</p>
        <p>Author Name: ${dataIndex.author.name ? dataIndex.author.name : "No Data Available"}</p>
        <p>Published Date: ${dataIndex.author.published_date ? dataIndex.author.published_date : "No Data Available"}</p>
        <p><i class="fa-solid fa-eye"></i> ${dataIndex.total_view ? dataIndex.total_view : "No Data Available"}</p>
        <p>Rating: ${dataIndex.rating.number ? dataIndex.rating.number : "No Data Available"}</p>
    `;
    modalBody.appendChild(modalDiv);

}



loadNews();