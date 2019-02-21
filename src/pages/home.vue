<template>
    <div id="home">
        <span>{{ msg }}</span>
    </div>
</template>

<script>
import login from '@/components/login'
import login_out from '@/components/login_out'
import axios from 'axios'

export default {
    name:"home",
    data(){
        return {
            msg:""
        }
    },
    components:{
        login,
        login_out
    },
    mounted(){
        let self = this
        axios.post
    }
}
</script>

<style scoped>

</style>
