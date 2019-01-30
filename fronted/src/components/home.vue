<template>
    <div id="home">
        {{ judge }}
    </div>    
</template>


<script>
import api from '../axios.js'

export default {
    data(){
        return {
            judge:"未登陆！"
        }
    },
    created(){
        api.home().then( response => {
            if(response.status === 401){
                this.$router.push('/login');
                //可以把无效的token清楚掉
                this.$store.dispatch('UserLogout');
            } else {
                this.judge = response.data
            }
        })
    }
}
</script>

<style scoped>

</style>
