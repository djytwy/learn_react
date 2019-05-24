<template>
    <g2-line 
    :id="my_g2"
    :chartData="data">
    </g2-line>   
</template>

<script>
import G2Line from '@/components/G2Line.vue'

export default {
    name:"showLineCharts",
    data(){
        return {
            data: [{
                year: '2010',
                value: 3
            }, {
                year: '2011',
                value: 4
            }, {
                year: '2012',
                value: 3.5
            }, {
                year: '2013',
                value: 5
            }, {
                year: '2014',
                value: 4.9
            }, {
                year: '2015',
                value: 6
            }, {
                year: '2016',
                value: 7
            }, {
                year: '2017',
                value: 9
            }, {
                year: '2018',
                value: 13
            }],
            my_g2:"line"
        }
    }
}
</script>

<style scoped>

</style>
