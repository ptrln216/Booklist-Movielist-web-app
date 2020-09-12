<template>
  <v-app id="inspire">
    <v-content class="v-content">
      <v-card
        max-width="400px"
        class="mx-auto mt-11"
      >
        <v-tabs
          fixed-tabs
          v-model="tab"
        >
          <v-tab>登錄</v-tab>
          <v-tab>注册</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <el-form
              :model="loginForm"
              status-icon
              :rules="rules"
              ref="loginForm"
              label-width="100px"
            >
              <el-form-item
                label="用户郵箱"
                prop="email"
              >
                <el-input
                  v-model="loginForm.email"
                  autocomplete="off"
                  placeholder="可用admin@qq.com登錄"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密碼"
                prop="password"
              >
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                  placeholder="默認密碼admin"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('loginForm')"
                >登錄</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </v-tab-item>

          <v-tab-item>
            <Register></Register>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-content>
    <v-footer
      color="blue-grey darken-2"
      app
      dark
    >
      <span class="white--text">&copy; 2020 PTRLN 林宇哲 171180577</span>
    </v-footer>
  </v-app>
</template>

<script>
import Register from "./Register";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Login",
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
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
        checkPass: ""
      },
      rules: {
        email: [
          { required: true, validator: checkEmail, trigger: "blur" },
          { type: "email", message: "請輸入正確的郵箱地址", trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      tab: null
    };
  },
  components: { Register },
  methods: {
    ...mapActions(["UserLogin", "SetUserEmail"]),
    handleClick() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("http://localhost:5000/api/login", {
              email: this.loginForm.email,
              password: this.loginForm.password
            })
            .then(response => {
              console.log(response);
              if (response.data.success) {
                this.UserLogin(response.data.token);
                this.SetUserEmail(response.data.useremail);
                this.$message({
                  message: "登錄成功",
                  type: "success"
                });

                // 如果登录后需要重定向页面，通过如下方式
                if (this.$route.query.redirect) {
                  let redirect_path = this.$route.query.redirect;
                  this.$router.push({ path: redirect_path });
                } else {
                  this.$router.push({ name: "Index" });
                }
              } else {
                this.$message({
                  message: "用戶郵箱或密碼錯誤",
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

.v-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}

#inspire {
  background-color: whitesmoke;
}
</style>