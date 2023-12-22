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
            this.store.modalDeleteText = ``;
            this.store.modalDeleteStatus = false;
        },
    },
    computed: {
        modalStatus() {
            return this.store.modalDeleteStatus;
        },
        text() {
            return this.store.modalDeleteText;
        },
    },
};
</script>
<template>
    <div class="modalWindow" v-if="modalStatus">
        <div class="window-wrapper">
            <div class="text">
                <h3>Are you sure you want to delete weather data in {{ text }}?</h3>
            </div>
            <div class="buttons-wrapper">
                <button class="btn" @click="store.deleteCityCard(text)">Yes</button>
                <button class="btn red" @click="closeWindow()">No</button>
            </div>
        </div>
    </div>
</template>
