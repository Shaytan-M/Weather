<script>
import cross from '@/icons/cross.vue';
import { useStore } from '@/stores/counter';
import favoriteIcon from '../../../icons/favorite.vue';
export default {
    props: ['cardItem', 'index'],
    emits: ['changeCity', 'deleteCard', 'addFavorites'],
    setup() {
        let store = useStore();
        return {
            store,
        };
    },
    computed: {
        defaultItem() {
            return useStore().userLocation.city == this.cardItem.name;
        },
        favorite() {
            let countItem = useStore().citysFavorites.findIndex(
                (item) =>
                    item.name == this.cardItem.name &&
                    item.lat == this.cardItem.lat &&
                    item.lon == this.cardItem.lon,
            );
            return countItem;
        },
    },
    components: {
        cross,
        favoriteIcon,
    },
};
</script>
<template>
    <div class="card border" @click="() => $emit('changeCity', cardItem.lat, cardItem.lon)">
        <div
            class="favorite"
            :class="{ active: favorite >= 0 }"
            v-if="store.cityCardStatus == 'Main'"
            @click="
                () => {
                    if (favorite >= 0) {
                        $emit('removeFavorites', index);
                    } else {
                        $emit('addFavorites', index);
                    }
                }
            "
        >
            <favoriteIcon />
        </div>
        <h3>{{ cardItem.name }}</h3>
        <div
            class="cross"
            v-if="!defaultItem || store.cityCardStatus == 'Favorites'"
            @click="() => $emit('deleteCard', cardItem.name)"
        >
            <cross />
        </div>
    </div>
</template>
<style scoped lang="scss">
.card {
    position: relative;
    .cross,
    .favorite {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        z-index: 2;
    }
    .cross {
        right: 10px;
    }
    .favorite {
        left: 10px;
        width: 15px;
        height: 15px;
        svg {
            fill: black;
            height: 100%;
            transition: 0.3s;
            &:hover {
                fill: #eebf00;
            }
        }
        &.active {
            svg {
                fill: #ffd422;
            }
        }
    }
}
</style>
