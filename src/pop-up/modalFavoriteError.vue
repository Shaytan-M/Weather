<script>
import { useStore } from '../stores/counter';
export default {
    setup() {
        let store = useStore();
        return {
            store,
        };
    },
    methods: {
        closeWindow() {
            this.store.modalErrorStatus = false;
        },
    },
    computed: {
        modalStatus() {
            return this.store.modalErrorStatus;
        },
    },
};
</script>
<template>
    <div class="modalWindow" v-if="modalStatus">
        <div class="window-wrapper">
            <div class="text">
                <h3>
                    the maximum number of cities in "favourites" is 5, to add a new city, remove one
                    of the "favourites"
                </h3>
            </div>
            <div class="buttons-wrapper">
                <button class="btn" @click="closeWindow()">OK</button>
            </div>
        </div>
    </div>
</template>
