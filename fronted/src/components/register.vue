<template>
    <span id="register">
        <el-button @click="show_table = true" type="primary">注册</el-button>
        <el-dialog 
            title="注册账号"
            :visible.sync="show_table"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.user_name" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_table = false">取消</el-button>
                <el-button type="primary" @click="register(),show_table = false">提交</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
import api from '../axios.js'

export default {
    data(){
        return {
            form:{
                user_name:"",
                password:"",
                age:"",
            },
            show_table:false
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
        register() {
            api.register(this.form)
                .then( response => {
                    const data = response.data
                    console.log(`服务器返回的信息：${JSON.stringify(data)}`)
                })

                .catch( err => {
                    console.log(`错误：${err}`)
                })
        }
    }
}
</script>

<style scoped>

</style>
