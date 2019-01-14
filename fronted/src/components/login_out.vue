<template>
    <el-button type="primary" @click="login_out()">
        登出
    </el-button>
</template>

<script>
import axios from 'axios'

export default {
    name:'login_out',
    methods:{
        login_out(){
            axios.get(
                "http://127.0.0.1:19930/login_out",
                { params:
                    { token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InR3eSIsImlhdCI6MTU0MTQ5ODAxMCwiZXhwIjoxNTQxNTg0NDEwfQ.ZQ1lUY-80n1EqYbMTYHZ19TQbBmgvyNOhYNVAtvLP98"}
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
