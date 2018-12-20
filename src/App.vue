<template>
  <v-app>
    <v-content>
      <Layout/>
    </v-content>
  </v-app>
</template>

<script>
import Layout from './views/Layout'

export default {
  name: 'App',
  components: {
    Layout
  },
  // data () {
  //   return {
  //     //
  //   }
  // }
}
</script>

<style lang="less">
@import '../styles/index.less';

.main {
  min-height: 350px;
  padding-bottom: 30px;
}
</style>