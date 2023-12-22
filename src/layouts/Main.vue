<script>
import { useStore } from '@/stores/counter';
import inputVue from '../components/input.vue';
import cityCards from '../components/citys/cityCards.vue';
import weatherCards from '../components/weatherCards/weatherCards.vue';
import modalDeleteCity from '@/pop-up/modalDeleteCity.vue';
import modalFavoriteError from '@/pop-up/modalFavoriteError.vue';
import chart from '../components/Chart/chart.vue';
export default {
    mounted() {
        let store = useStore();
        store.getUserLocation();
    },
    components: {
        inputVue,
        cityCards,
        weatherCards,
        modalDeleteCity,
        modalFavoriteError,
        chart,
    },
};
</script>
<template>
    <modalDeleteCity />
    <modalFavoriteError />
    <div class="content">
        <div>
            <inputVue />
        </div>
        <div>
            <cityCards />
            <weatherCards />
            <chart />
        </div>
    </div>
</template>
<style lang="scss"></style>
