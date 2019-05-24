<template>
    <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'

export default {
    data(){
        return {
            chart:null, 
        }
    },
    mounted(){
        this.drawChart()
    },
    props:{
        chartData:{
            type: Array,
            default: function(){
                return {
                    data:[]
                }
            } 
        },
        id:String,            
    },
    watch:{
        chartData: {
            handler (val, oldVal){
                console.log(`new: ${val}, old: ${oldVal}`);
                this.drawChart(val)
            },
            deep:true
        }
    },
    methods:{
        drawChart: function(){
            this.chart && this.chart.destroy()
            this.chart = new G2.Chart({
                container: this.id,
                forceFit: true,
                height: window.innerHeight
            });
            this.chart.source(this.chartData);
            this.chart.coord('polar');
            this.chart.legend({
                position: 'right',
                offsetY: -window.innerHeight / 2 + 180,
                offsetX: -140
            });
            this.chart.axis(false);
            this.chart.interval().position('year*population').color('year', G2.Global.colors_pie_16).style({
                lineWidth: 1,
                stroke: '#fff'
            });
            this.chart.render()
        }
    }
}
</script>

<style scoped>

</style>
