import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('storeId', {
    state: () => {
        return {
            userLocation: {},
            weatherInfoOneDay: [],
            citysMain: [],
            citysFavorites: [],
            inputLocation: {
                lat: '',
                lon: '',
                name: '',
            },
            modalErrorStatus: false,
            modalDeleteStatus: false,
            invalidInpuValue: false,
            modalDeleteText: '',
            cityCardStatus: 'Main',
        };
    },
    actions: {
        async getUserLocation() {
            try {
                let userLocation = await axios.get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_KEY}`,
                );
                this.userLocation = userLocation.data;
                this.getGeocoding(userLocation.data.city);
            } catch {
                this.getGeocoding('Lviv');
            }
        },
        async getOneDayWeather(lat, lon) {
            let oneDayWeathe = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&units=metric&appid=${
                    import.meta.env.VITE_WEATHER_KEY
                }`,
            );
            this.weatherInfoOneDay = oneDayWeathe.data.hourly.splice(0, 24);
        },
        async getGeocoding(city) {
            let geocoding = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
                    import.meta.env.VITE_WEATHER_KEY
                }`,
            );
            let lat = geocoding.data[0].lat;
            let lon = geocoding.data[0].lon;
            this.addCityCard(lat, lon, city);
        },
        deleteCityCard(city) {
            if (this.cityCardStatus == 'Main') {
                let index = this.citysMain.findIndex((i) => i.name == city);
                this.citysMain.splice(index, 1);
            } else {
                let index = this.citysFavorites.findIndex((i) => i.name == city);
                this.citysFavorites.splice(index, 1);
            }

            this.modalDeleteText = ``;
            this.modalDeleteStatus = false;
        },
        async addCityCard(lat, lon, city) {
            try {
                await this.getOneDayWeather(lat, lon);
                this.citysMain.push({ name: city, lat: lat, lon: lon });
            } catch (error) {
                this.invalidInpuValue = true;
            }
        },
    },
});
