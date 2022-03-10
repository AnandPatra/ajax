const baseUrl = "https://newsapi.org/v2/";
const apiKey = "&apiKey=05283a4b4df6486b82da766a85c802df";


const empUrl = "https://lwl-ems.herokuapp.com/api/ems/"


const initUrl = baseUrl + "everything?q=apple" + apiKey;

const countries = [
    {
        'name': 'India',
        'code': 'in',
    }, {
        'name': 'US',
        'code': 'us'
    }
]
countryDropdown();
// getNews(initUrl);


setEmployees();



function getEmployees() {
    fetch(empUrl + "/all", {
        method: "GET",

    }).then(result => result.json()).then(employees => { console.log(employees) });
}

function setEmployees() {

    let url = "https://m360qa1.dhi-edu.com/m360server/api/estimation-cart/get-all-estimation"

    let userData = {"id": 257, "name": "Demo User", "email": "user@mail.com", "salary": 250000 }

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwcm9kdWN0aGVhZEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9CVVNTSU5FU1NfVVNFUiIsImV4cCI6MTY0Njg0MDU2NiwidXNlcklkIjoxfQ.JQ9sVFCcW_IqrTQiVexj7-jHMNWs7YPjBru6hXGlHirmf_z35O7Q1R9k_bwMc7leUf8_uC_UbQ-gYvEc2MwxYBkyEEAfTtoR6vFCAx0JOEJ0lQSc0Dd8baXPlikTIMKJYZOHuNPFjZjmHfC5RVkpM9S6APNz3o3VO7g0odOj5eqIDQON6dxKEuO049AYY7eQBsQKK04M_LpX4nLSzGDUNURU0MAAOi7y4PmbOXI_Zi-zT-mknIAPoGUVboJG243HQNFc8huzFk43YMSDxqpDsvkjIMaQ0Mid8njLAJfjSmR_AifV7UqVTQVczKWkB8YJYNQBzwpKt2L9agj28oVDCw",
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log(result.json())
        getEmployees();
    });
}


function getNews(url) {
    let tempUrl = "https://newsapi.org/v2/everything?q=apple&apiKey=05283a4b4df6486b82da766a85c802df";

    let news = [];

    fetch(url).then(result => result.json()).then(res => {
        news = res['articles'];
        viewNews(news);
    }).catch(err => {
    });

}

function countryDropdown() {
    const countryRefence = document.querySelector("#countrySelect");

    let countrySelect = `<select class="form-select" aria-label="Select Country" id="countryOption">`

    countries.forEach(country => {
        countrySelect += `<option value="${country['code']}">${country['name']}</option>`
    });

    countrySelect += `</select>`;

    console.log(countrySelect)
    countryRefence.innerHTML = countrySelect;

}

function viewNews(news) {

    const newsReference = document.querySelector("#newsReference");
    let data = '';
    news.forEach(element => {
        data += `
        <div class="col">
        <div class="card" style="width: 18rem;">
        <img src="${element['urlToImage']}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element['title']}</h5>
    <p class="card-text">${element['description']}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${element['author']}</li>
    <li class="list-group-item">${element['publishedAt']}</li>
  </ul>
  <div class="card-body">
    <a href="${element['url']}" class="card-link">Read more...</a>
  </div>
</div>
</div>
    
        `
    });
    newsReference.innerHTML = data;
}

function search() {
    const countryValue = document.querySelector("#countryOption").value;

    const generatedUrl = baseUrl + "top-headlines?country=" + countryValue + apiKey;
    getNews(generatedUrl);
}
