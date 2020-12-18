const _API_KEY = "ffa10f7f79a1d4c8bf6530bea59996c6";
const _DAY_OF_WEEK = ["Chủ nhật","Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

let currentAPI = cityName => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${_API_KEY}&lang=vi`;
let forecastAPI = cityName => `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${_API_KEY}&lang=vi`;

let current = document.getElementById('current');
let forecast = document.getElementById('forecast');

let cityName = "Hà Nội";

async function fetchData(api) {
    try {
        let res = await fetch(api);
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
   
}

function Weather(cityName) {
    fetchData(currentAPI(cityName)).then( data => {
        let val = '';
        let temp = data['main']['temp'];
        let icon = data['weather'][0]['icon'];
        let date = new Date(data['dt']*1000);
        let description = data['weather'][0]['description'];
        val = `
            <h1>${data['name']}</h1>
            <p class="tempCurrent"><span>${Math.round(temp)}&#186</span></p>
            <div class="iconCurrent">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
            </div>
            <p class="day">${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</p>
            <div class="description">
                <p>${_DAY_OF_WEEK[date.getDay()]}</p>
                <p>${description}</p>
            </div>
            <b>Theo giờ</b>
        `;
        current.innerHTML = val;
    });
    
    fetchData(forecastAPI(cityName)).then( data => {
        let val = '';
        for(let i = 0 ; i < 6 ; i++) {
            let date = new Date(data['list'][i]['dt']*1000);
            let icon = data['list'][i]['weather'][0]['icon'];
            let temp = data['list'][i]['main']['temp'];
            val += `
            <div class="item">
                <p>${date.getHours()}h</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
                <p>${Math.round(temp)}&#186</p>
            </div>
            `;
        }
        forecast.innerHTML = val;
    })
}

Weather(cityName);

function getText(){
    test = document.getElementById("inputCity").value;
    fetchData(currentAPI(test))
        .then(data => data['cod'])
        .then ( val => {
            if(val != 200) {
                alert("Không tìm thấy tên thành phố này.");
                console.log(cod);
            } else  {
            Weather(test);
            }
        })
}
