<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="blue-grey darken-1"
    >
      <v-list nav>
        <v-list-item-group color="blue-grey lighten-5">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon
                v-text="item.icon"
                class="white--text"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                v-text="item.text"
                class="white--text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue-grey darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>LINST <v-icon>mdi-text-box-multiple</v-icon> 作品清單管家</v-toolbar-title>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="blue-grey"
              dark
              fab
              depressed
              v-on="on"
              fixed
              right
              bottom
              x-small
            >
              <v-avatar size="36px">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list
            min-width="150px"
            dense
            nav
          >
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title @click="userLogout">登出</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </v-menu>
      </div>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
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
import { mapActions } from "vuex";
export default {
  name: "Index",
  data: () => ({
    drawer: null,
    items: [
      { text: "書本清單", icon: "mdi-book-open", path: "/booklist" },
      { text: "電影清單", icon: "mdi-theater", path: "/movielist" }
    ]
  }),
  methods: {
    ...mapActions(["UserLogout"]),
    userLogout() {
      this.$router.push({ path: "/login" });
      this.UserLogout();
    }
  }
};
</script>

<style>
</style>