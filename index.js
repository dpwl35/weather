import { API_KEY } from "./env.js";

const getCurrentWeather = (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lang=kr&lon=${longitude}&appid=${API_KEY}&units=metric`;

  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const city = document.querySelector('.city');
    const weather = document.querySelector('.description');
    const icon = document.querySelector('.icon');
    const tempMin = document.querySelector('.temp-min');
    const tempMax = document.querySelector('.temp-max');
    const temp = document.querySelector('.temp');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const rain = document.querySelector('.rain');
    
    city.innerText = data.name;
    weather.innerText = data.weather[0].description;
    icon.classList.add(data.weather[0].icon);
    icon.src = `icon/${data.weather[0].icon}.svg`
    temp.innerText =  Math.floor(data.main.temp)+ `°`;
    tempMin.innerText = Math.floor(data.main.temp_min);
    tempMax.innerText = Math.floor(data.main.temp_max);
    wind.innerText = data.wind.speed;
    humidity.innerText = data.main.humidity;

    //비가 내리지 않아서 강수량이 없을 때 -로 표시하기
    const weatherText = data.weather[0].main;
    if(weatherText == 'Rain'){
      rain.innerText = data.rain['1h'];
    }else{
      rain.innerText = '-';
    };
    
    //console.log(data);

    const temp2 = temp.innerText.slice(0, -1);
    const clothes = document.querySelector('.clothes-txt');
    if( 4 >= temp2 ){
      clothes.innerText = '패딩, 두꺼운 코트, 누빔 옷, 기모'
    }else if( 8 >= temp2 ){
      clothes.innerText = '울 코트, 히트텍, 가죽 옷, 기모'
    }else if( 11 >= temp2){
      clothes.innerText = '트렌치 코트, 야상, 점퍼,기모바지'
    }else if( 16 >= temp2){
      clothes.innerText = '자켓, 가디건, 청자켓, 니트'
    }else if( 19 >= temp2){
      clothes.innerText = '얇은 가디건이나 니트, 맨투맨'
    }else if( 22 >= temp2){
      clothes.innerText = '블라우스, 긴팔 티, 면바지'
    }else if( 27 >= temp2){
      clothes.innerText = '반팔, 얇은 셔츠, 반바지'
    }else if( 28 <= temp2){
      clothes.innerText = '민소매, 반팔, 반바지, 린넨'
    }
    
   });
}


const noti = document.querySelector('.noti')
const weather1 = document.querySelector('.weather')

//좌표 사용이 허락됐을 때 - 위도, 경도 좌표 구하기 
const getPosition = (position) => {
  const {latitude, longitude} = position.coords;
  getCurrentWeather(latitude, longitude);
  noti.style.display = 'none';
  weather1.style.display = 'flex';
}

//좌표 사용이 차단됐을 경우 뜨는 에러 메세지
const errorHandler = (error) => {
  console.log(error.message);
  weather1.style.display = 'none';
  noti.style.display = 'block';
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(getPosition, errorHandler);
} else {
  console.log('geolocation IS NOT available');
}


//날짜, 시간
var today = new Date();
var todayYear = today.getFullYear();
var todayMonth = today.getMonth() + 1;
var todayDate = today.getDate();

//10월 이전이거나 일이 10일 이전이면 2자리가 되지 않기 때문에
var todayString = todayYear + "-";
if (todayMonth < 10) {
	todayString += "0";
}
todayString += todayMonth + "-";
if (todayDate < 10) {
	todayString += "0";
}
todayString += todayDate;
document.querySelector('.date').innerText = todayString;

