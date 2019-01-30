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
                    <el-input v-model="form.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.userpwd" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.userage" clearable></el-input>
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
import axios from 'axios'

export default {
    data(){
        return {
            form:{
                username:"",
                userpwd:"",
                userage:"",
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
            let self = this
            axios.post("http://127.0.0.1:3001/register",{
                username:self.form.username,
                userpwd:self.form.userpwd,
                userage:self.form.userage
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>
