import { WeatherAPI } from "./index.js";

function testURLBuilder() {
    const weatherAPI = new WeatherAPI();
    weatherAPI.buildURL('Bangalore');
}
testURLBuilder();

function testAPI(){
    const weatherAPI = new WeatherAPI();
    weatherAPI.init('Bangalore').then((res)=>{
        console.log(res)
    });

    //console.log(data);
}
testAPI();
