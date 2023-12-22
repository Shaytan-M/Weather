<script>
import card from './parts/card.vue';
import { useStore } from '@/stores/counter';
export default {
    emits: ['addCity'],
    setup() {
        let store = useStore();
        let tabs = ['Main', 'Favorites'];
        return {
            store,
            tabs,
        };
    },
    computed: {
        citys() {
            return this.store.cityCardStatus == 'Main'
                ? this.store.citysMain
                : this.store.citysFavorites;
        },
        weatherInfo() {
            return this.store.weatherInfoOneDay;
        },
    },
    methods: {
        changeCity(lat, lon) {
            this.store.getOneDayWeather(lat, lon);
        },
        changeStatus(tab) {
            this.store.cityCardStatus = tab;
        },
        deleteCard(city) {
            if (this.store.cityCardStatus == 'Main') {
                this.store.modalDeleteText = `${city}`;
            } else {
                this.store.modalDeleteText = `${city} from Favorite`;
            }
            this.store.modalDeleteStatus = true;
        },
        addFavorites(key) {
            if (this.store.citysFavorites.length < 5) {
                this.store.citysFavorites.push(this.store.citysMain[key]);
            } else {
                this.store.modalErrorStatus = true;
            }
        },
        removeFavorites(key) {
            this.store.citysFavorites.splice(key, 1);
        },
    },
    components: {
        card,
    },
};
</script>
<template>
    <div class="city-cards__section">
        <div class="row">
            <div class="tabs-button">
                <div
                    class="button"
                    :class="{ active: store.cityCardStatus == item }"
                    @click="changeStatus(item)"
                    v-for="(item, index) in tabs"
                    :key="index"
                >
                    <h3>{{ item }}</h3>
                </div>
            </div>
            <div class="city-cards__wrapper border">
                <card
                    v-for="(item, index) in citys"
                    :key="index"
                    :cardItem="item"
                    :index="index"
                    @changeCity="changeCity"
                    @deleteCard="deleteCard"
                    @addFavorites="addFavorites"
                    @removeFavorites="removeFavorites"
                />
                <div
                    v-if="citys.length < 5 && store.cityCardStatus == 'Main'"
                    class="add-card border"
                    @click="
                        store.addCityCard(
                            this.store.inputLocation.lat,
                            this.store.inputLocation.lon,
                            this.store.inputLocation.name,
                        )
                    "
                >
                    <h3>+</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.city-cards {
    &__section {
        margin: 50px 0;
        .tabs-button {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding-left: 7px;
            .button {
                padding: 5px 10px;
                border: 1px solid gray;
                position: relative;
                cursor: pointer;
                opacity: 0.5;
                &:first-child {
                    border-top-left-radius: 10px;
                    &::before {
                        border-top-left-radius: 9px;
                    }
                }
                &:last-child {
                    border-top-right-radius: 10px;
                    &::before {
                        border-top-right-radius: 9px;
                    }
                }
                &::before {
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: gray;
                    z-index: 10;
                    opacity: 0.5;
                }
                &.active {
                    opacity: 1;
                    &::before {
                        opacity: 0;
                    }
                }
            }
        }
    }
    &__wrapper {
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 15px;
        align-items: stretch;
        min-height: 62px;

        .card,
        .add-card {
            text-align: center;
            cursor: pointer;
            transition: 0.3s;
            background: $buttonColor;
            padding: 5px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: var(--color-background-soft);
            }
        }
        .add-card {
            background: transparent;
        }
    }
}
</style>
