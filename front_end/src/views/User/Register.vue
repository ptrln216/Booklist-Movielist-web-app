<template>
  <el-form
    :model="registerForm"
    status-icon
    :rules="rules"
    ref="registerForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="用户郵箱"
      prop="email"
    >
      <el-input
        type="email"
        v-model="registerForm.email"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密碼"
      prop="password"
    >
      <el-input
        type="password"
        v-model="registerForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="確認密碼"
      prop="checkPass"
    >
      <el-input
        type="password"
        v-model="registerForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('registerForm')"
      >提交</el-button>
      <el-button @click="resetForm('registerForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("郵箱不能爲空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請輸入密碼"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請再次輸入密碼"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("兩次輸入密碼不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        password: "",
        checkPass: ""
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: "blur" },
          { type: "email", message: "請輸入正確的郵箱地址", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("http://localhost:5000/api/register", {
              email: this.registerForm.email,
              password: this.registerForm.password
            })
            .then(response => {
              console.log(response);
              if (response.data.success === true) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                this.resetForm("registerForm");
              } else if (response.data.success === "用戶名已經存在") {
                this.$message({
                  message: "用戶名已經存在",
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(`error: ${error}`);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin: 20px;
}
</style>