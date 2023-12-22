<script lang="ts">
import Chart from 'chart.js/auto';
import { useStore } from '../../stores/counter';
export default {
    data() {
        return {
            search: 'chart',
        };
    },
    setup() {
        let store = useStore();
        let chart = {};
        return {
            store,
            chart,
        };
    },
    computed: {
        chartData() {
            let arr = this.store.weatherInfoOneDay.filter((item) => {
                let itemDate = new Date(item.dt * 1000);
                let today = new Date();
                if (today.getDate() == itemDate.getDate()) {
                    return true;
                } else {
                    return false;
                }
            });
            return arr.map((element) => {
                var d = new Date(element.dt * 1000);
                var hours = d.getHours();
                var minutes = '0' + d.getMinutes();
                let convertTime = [hours, minutes].join(':');
                let res = { ...element, dt: convertTime };
                return res;
            });
        },
    },
    watch: {
        chartData(data) {
            this.changeData();
            this.chart.update();
        },
    },
    methods: {
        initChart() {
            this.chart = new Chart(this.$refs.chart, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Temperature',
                            data: [],
                            cubicInterpolationMode: 'monotone',
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMin: -40,
                            suggestedMax: 40,
                        },
                    },
                },
            });
        },
        changeData() {
            this.chart.data.datasets[0].data = this.chartData.map((row) => row.temp);
            this.chart.data.labels = this.chartData.map((row) => row.dt);
            this.chart.update();
        },
    },
    mounted() {
        this.initChart();
    },
};
</script>
<template>
    <div class="row">
        <div><canvas ref="chart" id="acquisitions"></canvas></div>
    </div>
</template>
