<script>
import { useStore } from '@/stores/counter';
export default {
    setup() {
        let store = useStore();
        return {
            store,
        };
    },
    watch: {
        'store.invalidInpuValue'(value) {
            if (value) {
                setTimeout(() => {
                    this.store.invalidInpuValue = false;
                }, 3000);
            }
        },
    },
    methods: {
        setPlace(value) {
            let lat = value.geometry.location.lat();
            let lon = value.geometry.location.lng();
            this.store.inputLocation.lat = lat;
            this.store.inputLocation.lon = lon;
            this.store.inputLocation.name = value.name;
        },
    },
};
</script>
<template>
    <div class="header-input__section">
        <div class="row">
            <div class="header-input__wrapper">
                <GMapAutocomplete
                    class="input pac-target-input"
                    :class="{ invalid: store.invalidInpuValue }"
                    placeholder="City"
                    @place_changed="(e) => setPlace(e)"
                >
                </GMapAutocomplete>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.header-input {
    &__wrapper {
        text-align: center;
        .pac-target-input {
            width: 300px;
            max-width: 100%;
            padding: 10px;
            border: 1px solid #444;
            border-radius: 6px;
            color: #fff;
            background-color: $a;
            transition: border-color 0.2s, box-shadow 0.2s;

            &:focus {
                border-color: $buttonColor;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                outline: none;
            }
            &.invalid {
                border: 1px solid rgb(124, 1, 1);
                box-shadow: 1px 1px 10px 1px red;
            }
        }
    }
}
</style>
