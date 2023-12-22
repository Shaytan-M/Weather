<script>
export default {
    props: {
        cardItem: Object,
    },
    computed: {
        time() {
            var date = new Date(this.cardItem.dt * 1000);
            var hours = date.getHours();
            var minutes = '0' + date.getMinutes();
            var formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        },
        temp() {
            return Math.round(this.cardItem.temp * 2) / 2;
        },
        icon() {
            return `https://openweathermap.org/img/wn/${this.cardItem.weather[0].icon}@2x.png`;
        },
    },
};
</script>
<template>
    <div class="card">
        <div class="image"><img :src="icon" alt="" /></div>
        <h4 class="time">
            {{ time }}
        </h4>
        <h4 class="temp">{{ temp }}°C</h4>
        <h4 class="wind">{{ cardItem.wind_speed }}</h4>
        <h4 class="humidity">{{ cardItem.humidity }}%</h4>
    </div>
</template>
<style lang="scss">
.image {
    height: 50px;
    text-align: center;
    img {
        height: 100%;
        widows: 100%;
    }
}
</style>
