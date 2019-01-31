<template>
    <div id="home">
        {{ judge }}
        <el-button v-show="show" type="primary" @click="login_out()">登出</el-button>
    </div>    
</template>


<script>
import api from '../axios.js'

export default {
    name:"home",
    data(){
        return {
            judge:"未登陆！",
            show:false
        }
    },
    created(){
        api.home().then( response => {
            if(response.status === 401){
                this.$router.push('/login');
                //可以把无效的token清楚掉
                this.$store.dispatch('UserLogout');
            } else {
                this.show = true;
                this.judge = response.data
            }
        })
    },
    methods:{
        login_out(){
            this.$store.dispatch('UserLoginout');
            if (!this.$store.state.token) {
                this.$router.push('/login')
                this.$message({
                    type:'success',
                    message:'登出成功！'
                })
            } else {
                this.$message.error('登出失败 ！')
            }
        }
    }
}
</script>

<style scoped>

</style>
