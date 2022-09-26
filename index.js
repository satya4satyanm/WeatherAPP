// import fetch from "cross-fetch";
import { Utils, CELCIUS_SYMBOL } from "./utils.js";

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '9927ef31dd8eac8347d4da6b6c25f25c';

class WeatherAPI {
    constructor() {
        this.apiURL = new URL(API_BASE_URL);
    }

    init(userData) {
        this.buildURL(userData);

        return this.makeAPICall(userData);
    }

    async makeAPICall(userData) {
        let response = await fetch(this.apiURL);

        if (response.status === 200) {
            let data = await response.json();
            this.processInfo(data)
            return data;
        } else {
            return 'Error'
        }
    }

    processInfo() {
        //console.log(data)
    }

    buildURL(userData) {
        this.apiURL.searchParams.append('q', userData);
        this.apiURL.searchParams.append('appid', API_KEY);
        this.apiURL.searchParams.append('units', 'metric');

        //console.log( this.apiURL );
    }
}


class WeatherController {
    init() {
        this.addListeners();
    }

    addListeners() {
        const searchBoxElement = document.querySelector('.search-box');
        searchBoxElement.addEventListener('keypress', this.handleSearch);
        searchBoxElement.param1=this;
    }

    handleSearch(e) {
        // console.log(e.target.value)
        if (e.key === 'Enter' || e.keyCode === 13) {
            const target = e.target;
            const userData = target.value;

            const weatherAPI = new WeatherAPI();
            weatherAPI.init(userData).then((res) => {
                console.log(res)

                target.param1.updateUI(res);
            });
        }
    }

    updateUI(data){
        let city = document.querySelector('.location .city');
        city.innerText = `${data.name}, ${data.sys.country}`;

        let date = document.querySelector('.location .date');
        date.innerText = Utils.formatDate();


        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${data.main.temp} ${CELCIUS_SYMBOL}`;

        let weather = document.querySelector('.current .weather');
        weather.innerText = `${data.weather[0].main}`;

        let highlow = document.querySelector('.current .hi-low');
        highlow.innerHTML = `${data.main.temp_min} ${CELCIUS_SYMBOL} / ${data.main.temp_max} ${CELCIUS_SYMBOL}`;
    }
}

export { WeatherAPI, WeatherController };