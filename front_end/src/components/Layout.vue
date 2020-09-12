<template>
  <el-container style="height:100%">
    <el-header height="75px">
      <div class="logo">
        <i class="el-icon-receiving"></i>
        <span class="header-title">LINST 作品清單管家</span>
      </div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </el-header>

    <el-container style="100%">
      <el-aside
        width="200px"
        style="100%"
      >
        <el-col>
          <el-menu
            default-active="/booklist"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/booklist">
              <i class="el-icon-reading"></i>
              <span>
                書單
              </span>
            </el-menu-item>
            <el-menu-item index="/movielist">
              <i class="el-icon-film"></i>
              <span>
                電影清單
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-main>
        <slot />
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Layout",
  methods: {
    goto(path) {
      console.log(path);
      this.$router.push(`/${path}`);
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  overflow: hidden;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #545c64;
  color: #fff;

  border-bottom: solid 1px darkgrey;
}

.logo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
}

.header-title {
  margin-left: 0.3rem;
}

.el-aside {
  display: block;
  background-color: #545c64;
}

.el-main {
  background-color: whitesmoke;
  overflow-y: scroll;
  height: 100%;
}
</style>
