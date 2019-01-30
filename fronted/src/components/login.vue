<template>
    <div id="login">
        <h3>请输入用户名和密码：</h3>
        <el-input
            class="login_input"
            placeholder="请输入用户名"
            v-model="username">
        </el-input>
        <el-input
            class="login_input"
            type="password"
            placeholder="请输入密码"
            v-model="userpwd">
        </el-input>
        <el-row>
            <register></register>
            <el-button type="primary" @click="login()">登录</el-button>
            <loginout user=""></loginout>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import loginout from '@/components/login_out'
import register from '@/components/register'

export default {
    name:"login",
    data(){
        return {
           username:"",
           userpwd:"",
           token:"",
           login_name:""
        }   
    },
    components:{
        loginout,
        register
    },
    methods:{
        login(){
            let self = this
            axios.post("http://127.0.0.1:3001/api/login",{
                user_name:self.username,
                password:self.userpwd
            })

            .then(function(response) {
                const data = response.data
                if(data.status === "success") {
                    self.$message({
                        message: '登录成功 ！！！',
                        type:'success'
                    })
                    self.login_name = data.user
                    axios.defaults.headers.common['Authorization'] = data.user
                } else {
                    self.$message.error('账号或密码错误！')
                }
            })

            .catch(function(err) {
                console.log(`error : ${err}`)
            })
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
#login {
    width: 20%;
    margin: 0px auto;
}
.login_input {
    margin: 15px
}
</style>
