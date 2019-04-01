<template>
    <div id="login">
        <h3>请输入用户名和密码：</h3>
        <el-form :model="login_msg" status-icon :rules="check" ref="login_msg" lable-width="100px">
            <el-form-item label="账号" prop="user_name">
                <el-input v-model="login_msg.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login_msg.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <register></register>
                <el-button type="primary" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '../axios.js'
import register from '@/components/register'

export default {
    name:"login",
    data() {

        const validateUsername = (rule, value, callback) => {
            const reg = /[@#$%^&*()!]/
            if (!value) 
                callback(new Error('用户名不能为空！'))
            else if(reg.test(value))
                callback(new Error('用户名不能包含违法字符！'))
            else 
                callback()
        }

        const validatePassword = (rule, value, callback) => {
            const reg = /[!@#$%^&*()]/
            if (!value) 
                callback(new Error('密码不能为空！'))
            else if(reg.test(value))
                callback(new Error('密码中不能包含违法字符！'))
            else 
                callback()
        }

        return {
            token:"",
            login_msg:{
                user_name:"",
                password:""
            },
            check:{
                user_name: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ]
            }
        }   
    },
    components:{
        register
    },
    methods:{
        login(){
            const data = this.login_msg
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
                        this.$message.error(data.message)
                    }
                })

                .catch( err => {
                    console.log(`失败：${err}`)
                })
        }
    }
}
</script>

<style scoped>
#login {
    width: 25%;
    float: 0px;
    margin: auto;
}
</style>
