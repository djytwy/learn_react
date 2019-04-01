<template>
    <div id="test">
        <el-button>{{ test }}</el-button>
        <!-- <el-form :model="login_msg" status-icon ref="login_msg" lable-width="100px">
            <el-form-item label="账号" prop="user_name">
                <el-input v-model="login_msg.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login_msg.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                
                <el-button type="primary" @click="login()">登录</el-button>
            </el-form-item>
        </el-form> -->

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>    
</template>

<script>
export default {
    name:'test',
    // data(){
    //     return {
    //         test:'这是一个按钮！',
    //         login_msg:{
    //             user_name:"",
    //             password:""
    //         }
    //     }
    // },
    // methods:{
    //     login(){
    //         console.log("test !!!")
    //     }
    // }
     data() {
      return {
         test:'这是一个按钮！',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style scoped>

</style>
