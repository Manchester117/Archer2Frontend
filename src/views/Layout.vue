<template>
  <v-app id="inspire" :dark="dark">
    <!-- 左侧导航栏 -->
    <v-navigation-drawer
      :dark="dark"
      persistent
      v-model="drawer"
      clipped
      enable-resize-watcher
      fixed
      app
    >
      <v-list class="pt-0" dense>
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >      
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- 顶部工具栏 -->
    <v-toolbar app fixed clipped-left dark :color="dark ? 'secondary' : 'primary'"> <!-- 主题Theme风格开关 -->
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Application</v-toolbar-title>
      <v-flex xs1 class="ml-4">
        <v-switch
          :label="dark ? 'dark' : 'light'"
          v-model="dark"
          color="dark"
          hide-details
        />
      </v-flex>
    </v-toolbar>
    <!-- 中间主页面 -->
    <v-content class="px-0 pt-0">
      <!--定义一个路由锚点,Layout的子组件内容将在这里展示-->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import menus from "../menu"

  export default {
    name: 'App',
    data: () => ({
      drawer: null,   // 将菜单弹出置为null
      dark: false,
      menuData: {}
    }),
    props: {
      source: String
    },
    watch: {},
    computed: {
      items() {
        return menus;
      },
      // 面包屑需要使用
      item_1() {
        const arr = this.$route.path.split("/");
        return this.menuData[arr[1]].title;
      },
      item_2() {
        const arr = this.$route.path.split("/");
        return this.menuData[arr[1]][arr[2]];
      }
    },
    created() {
      menus.forEach(m => {
        const p = m.path.slice(1);
        this.menuData[p] = {name: m.title};
        m.items.forEach(i => {
          this.menuData[p][i.path.slice(1)] = i.title;
        })
      })
    }
  }
</script>