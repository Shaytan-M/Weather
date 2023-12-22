<script>
import { useStore } from '@/stores/counter';
import card from './parts/card.vue';
export default {
    setup() {
        let store = useStore();
        return {
            store,
        };
    },
    computed: {
        weatherInfo() {
            return this.store.weatherInfoOneDay.filter((item) => {
                let itemDate = new Date(item.dt * 1000);
                let today = new Date();
                if (today.getDate() == itemDate.getDate()) {
                    return true;
                } else {
                    return false;
                }
            });
        },
    },
    components: {
        card,
    },
};
</script>
<template>
    <div class="weather-cards__section">
        <div class="row">
            <div class="weather-cards__wrapper border">
                <div class="first-card">
                    <h4>Time</h4>
                    <h4>°C</h4>
                    <h4>Wind Speed</h4>
                    <h4>Humidity</h4>
                </div>
                <card v-for="(item, index) in weatherInfo" :key="index" :cardItem="item" />
            </div>
        </div>
    </div>
</template>
<style scopted lang="scss">
.weather-cards {
    &__wrapper {
        display: flex;
        grid-gap: 5px;
        overflow-x: scroll;
        padding: 10px;
        &::-webkit-scrollbar {
            width: 8px; /* ширина всей полосы прокрутки */
            height: 8px;
        }
        &::-webkit-scrollbar-track {
            background: gray; /* цвет зоны отслеживания */
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: rgb(41, 40, 40); /* цвет бегунка */
            border-radius: 20px; /* округлось бегунка */
            border: 1px solid rgb(104, 103, 103); /* отступ вокруг бегунка */
            border-radius: 10px;
        }
        .first-card,
        .card {
            min-width: 100px;
            flex-basis: 100px;
            h4 {
                margin: 10px 0;
                text-align: center;
            }
        }
        .first-card {
            padding-top: 50px;
        }
    }
}
</style>
