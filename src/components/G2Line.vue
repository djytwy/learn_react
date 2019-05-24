<template>
    <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'

export default {
    data () {
        return {
            chart:null
        }
    },
    mounted(){
        this.drawChart()
    },
    props: {
        chartData: {
            type: Array,
            default: function() {
                return {
                    data: []
                }
            }
        },
        id:String
    },
    watch: {
        chartData: {
            handler (val, oldVal) {
                console.log(`new: ${val}, old: ${oldVal}`);
                this.drawChart(val)
            },
            deep:true
        } 
    },
    methods: {
        drawChart: function () {
            this.chart && this.chart.destroy()
            this.chart = new G2.Chart({
                container: this.id,
                width: 600,
                height: 300
            })
            this.chart.source(this.chartData)
            this.chart.scale('value', {
                min: 0
            })
            this.chart.scale('year', {
                range: [0,1]
            })
            this.chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            })
            this.chart.line().position('year*value')
            this.chart.point().position('year*value').size(4).shape('circle').style({
                stroke:'#fff',
                lineWidth: 1
            })
            this.chart.render()
        }
    }
}
</script>


<style scoped>

</style>
