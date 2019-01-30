<template>
    <el-button type="primary" @click="login_out()">
        登出
    </el-button>
</template>

<script>
import axios from 'axios'

export default {
    name:'login_out',
    props:['user'],
    methods:{
        login_out(){
            axios.get(
                "http://127.0.0.1:3001/login_out",
                { params:
                    { token:""}
            }).then( response => {
                console.log(response.data);
            }).catch( error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
