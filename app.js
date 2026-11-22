// JS CODE to deal with DOM Manipulation

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details")
const time =document.querySelector(".time")
const icon = document.querySelector(".icon img")

//=========THIRD STEP===========

/*updating the UI with the custom object (2 key-values pairs [cityDetails & weather])
from the "updateCity" function
*/
const updateUI = (data)=>{
    const cityDetails = data.cityDetails
    const weather = data.weather
    
    console.log(cityDetails)
    console.log(weather)

    //update "details" template
    details.innerHTML= `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="text-4xl font-bold my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg; C</span>
    </div>
    `

    //update the night/day image
    let timeSrc = null;

    if(weather.IsDayTime){
        timeSrc = "img/day.svg"
    }else{
        timeSrc = "img/night.svg"
    }

    time.setAttribute("src",timeSrc)

    //update the icon based on (weather.WeatherIcon) --> https://thenounproject.com/browse/collection-icon/climacons-10/?p=1
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc)

    //remove "hidden" class if present
    if(card.classList.contains("hidden")){
        card.classList.remove("hidden")
    }
    
}


//=========SECOND STEP===========
const updateCity = async (city) => {

  // using the 2 async API calls functions in our "forecast.js"
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  //return a custom object with 2 key-values pairs
  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};

updateCity('Kuala Lumpur')

//=========FIRST STEP===========
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value from our <form> input
  const city = cityForm.city.value.trim();

  cityForm.reset();

  //get the city details & weather info
  updateCity(city)
    // .then((data) => {
    //   console.log(data);
    // })
    .then(data =>{
        updateUI(data)
    })
    .catch((err) => {
      console.log(err);
    });
});
