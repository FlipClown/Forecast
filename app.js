window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    let humiditySection = document.querySelector('.humidity-section');
    let precipitationSection = document.querySelector('.precipitation-section');
    const temperatureSpan = document.querySelector('.temperature-section span');

    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
                long = position.coords.longitude;
                lat = position.coords.latitude;
                
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/5c21c490b59a9097700eecaa2c4806ba/${lat},${long}`;
                
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const {temperature, summary, humidity, precipProbability, icon} = data.currently;
                        //Set DOM Elements from the API
                        temperatureDegree.textContent = Math.floor(temperature);
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        humiditySection.textContent = "Humidity: " + Math.floor(humidity) * 100 + "%";
                        precipitationSection.textContent = "Chance of rain: " + precipProbability + "%";
                        //FORMULA FOR CELCIUS
                        let celcius = (temperature - 32) * (5 / 9);
                            //Set Icon
                            setIcons(icon,document.querySelector('.icon'));
                            //Change temperature to Celcius/Farenheit
                            temperatureSection.addEventListener('click',() =>{
                                if(temperatureSpan.textContent === "F°"){
                                    temperatureSpan.textContent = "C°";
                                    temperatureDegree.textContent = Math.floor(celcius);
                                } else { temperatureSpan.textContent = "F°";
                                        temperatureDegree.textContent = Math.floor(temperature);
                            }
                            });
                    });
            });

    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
