<template>
    <div id="login_c">
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
        </el-row>
    </div>
</template>

<script>
import api from '../axios.js'
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
        register
    },
    methods:{
        login(){
            const data = { user_name:this.username,password:this.userpwd }
            api.login(data)
                .then( response => {
                    const data = response.data
                    if( data.status === "success" ) {
                        this.$message({
                            message:"登录成功 ！！！",
                            type:"success"
                        })
                        this.$store.dispatch('UserLogin', data.token);
                        this.$store.dispatch('UserName', data.user);
                        this.$router.push({
                            path: "/"
                        });
                    } else {
                        this.$message.error('账号或密码错误！')
                    }
                })

                .catch( err => {
                    console.log(`失败：${err}`)
                })
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>

</style>
