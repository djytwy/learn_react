<template>
    <span id="register">
        <el-button @click="click_reg('form')" type="primary">注册</el-button>
        <el-dialog 
            title="注册账号"
            :visible.sync="show_dialog"
            width="25%"
            :before-close="handleClose"
            center>
            <el-form ref="form" :model="form" status-icon :rules="check_reg" label-width="80px">
                <el-form-item label="账号" prop="user_name">
                    <el-input v-model="form.user_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_dialog = false">取消</el-button>
                <el-button type="primary" @click="register('form'),show_dialog = false">提交</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
import api from '../axios.js'

export default {
    data(){

        const validateUsername = (rule, value, callback) => {
            const reg = /[\*\&\%\$\#\@\!\(\)\^\-\=\+\_]/  
            if (!value)
                callback(new Error('用户名不能为空！'))
            else if (reg.test(value))
                callback(new Error('用户名不能包含违法字符！'))
            else 
                callback()
        }

        const validatePassword = (rule, value, callback) => {
            const reg = /[\*\&\%\$\#\@\!\(\)\^\-\=\+\_]/
            if (!value) 
                callback(new Error('密码不能为空！'))
            else if(reg.test(value))
                callback(new Error('密码中不能包含违法字符！'))
            else if(value.length < 6)
                callback(new Error('密码的位数不能小于6位！'))
            else 
                callback()
        }

        const validateAge = (rule, value, callback) => {
            if(!value)
                return callback(new Error('年龄不能为空！'))
            else if(value < 18)
                callback(new Error('年龄小于18！'))
            else
                callback()
        }

        return {
            form:{
                user_name:"",
                password:"",
                age:"",
            },
            show_dialog:false,
            check_reg:{
                user_name: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.$message.error('数据有误！请核对后再提交！')
                } else {
                    const self = this
                    api.register(this.form)
                    .then( response => {
                        const data = response.data
                        console.log(`服务器返回的信息：${JSON.stringify(data)}`)
                        if(data.hasOwnProperty("status")) {
                            this.$message.error('该账号已经被注册！')
                        } else {
                            self.resetForm('form')
                            self.$message({
                                message:"注册成功！",
                                type:"success"
                            })
                        }  
                    })

                    .catch( err => {
                        console.log(`错误：${err}`)
                    })
                }
            })   
        },
        resetForm(formName){
            this.$refs[formName].resetFields()
        },
        click_reg(formName) {
            this.show_dialog = true
        }
    }
}
</script>

<style scoped>

</style>
