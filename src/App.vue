<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="sidbar" style="height:100vh;">
          <h1 style="text-align:left;padding:0px 30px">YouThat</h1>
          <el-menu style="text-align:left;">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>크롤러 관리</template>
              <el-menu-item-group>
                <router-link to="/youtubers"><el-menu-item v-on:click="()=>{changState(1)}" index="1-1">>유튜버 목록 조회</el-menu-item></router-link>
                <router-link to="/videos"><el-menu-item v-on:click="()=>{changState(2)}" index="1-2">동영상 목록 조회</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>api 테스트</template>
              <el-menu-item-group>
                <router-link to="/apis/channels"><el-menu-item v-on:click="()=>{changState(3)}" index="2-1">Channels</el-menu-item></router-link>
                <router-link to="/apis/get"><el-menu-item v-on:click="()=>{changState(4)}" index="2-2">get</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <div v-if="state">
          <h3 style="text-align:left">{{title}}</h3>
          <router-view>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: 'dsafsd',
      input: '',
      state: 0
    }
  },
  methods: {
    changState(state) {
      switch (state) {
        case 1:
          this.title ="유튜버 목록 조회"
          this.state = state
          break
        case 2:
          this.title ="동영상 목록 조회"
          this.state = state
          break
        case 3:
          this.title ="apis/channels"
          this.state = state
          break
        case 4:
          this.title ="apis/get"
          this.state = state
          break
        default:
          break
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
html {
  height: 100%;
}
body {
  min-height: 100%;
}
.el-input {
  max-width: 550px!important;
  min-width: 330px;
}
div.searchbar {
  margin-top: 15px;
  width :100%;
  text-align: left;
}
div.cell {
  text-align: center;
}
.el-alert--success {
  z-index: 100;
  width: 500px;
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-menu-item * {
    text-decoration: none;
    color:black;
}
</style>
