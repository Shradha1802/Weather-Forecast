let searchInp = document.querySelector(".searchInp");
let searchBtn = document.querySelector(".searchBtn");
let cloudImg = document.querySelector(".cloudImg");
let temperature = document.querySelector(".temperature");
let cityName = document.querySelector(".cityName");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".windSpeed");
let AQI = document.querySelector(".AQI");


// let url="https://api.openweathermap.org/data/2.5/forecast?q=Delhi&units=metric&appid=43d4c778b219d77c4b84baf157d553ea";

searchBtn.addEventListener("click", () => {
    let name = searchInp.value;
    name = name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    // console.log(name);
    getfact(name);
})
searchInp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();  // simulate button click
    }
});



async function getfact(name) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=43d4c778b219d77c4b84baf157d553ea&units=metric`;
        let aqiAPI=`https://api.waqi.info/feed/${name}/?token=d974f540a3755003609145159037532e02e6df3c`;
        let res = await axios.get(url);
        searchInp.setAttribute("value", name);
        searchInp.value = name;
        cloudImg.setAttribute("src", getWeatherRange(res.data.main.temp));
        temperature.innerText = res.data.main.temp + " °C";
        cityName.innerText = name
        humidity.innerText = res.data.main.humidity + "%";
        windSpeed.innerText = res.data.wind.speed + " km/hr";

        let a= await axios.get(aqiAPI);
        // console.log(a.data.data.aqi);
        AQI.innerText=a.data.data.aqi;
    }
    catch (err) {
        console.log("Error-> ", err);
    }
}
getfact("Bangalore");



function getWeatherRange(temp) {

    if (temp >= 30) {
        return "sun.png";
    }
    else if (temp >= 15 && temp < 25) {
        return "cloudy.png";
    }
    else if (temp >= 18 && temp < 28) {
        return "heavy-rain.png";
    }
    else if (temp >= 20 && temp < 30) {
        return "lightning.png";
    }
    else if (temp < 5) {
        return "snowflake.png";
    }
    else if (temp >= 5 && temp < 15) {
        return "fog.png";

    }
}



