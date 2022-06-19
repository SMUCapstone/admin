<template>
<div id="app" style="height: 100%;">
  <el-container style="height: 100%;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <div class="sidbar" style="height:100vh;">
        <h1 style="text-align:left;padding:0px 30px">YouThat</h1>
        <el-menu style="text-align:left;">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>크롤러 관리</template>
            <el-menu-item-group>
              <el-menu-item v-on:click="()=>{state=1}" index="1-1">유튜버 목록 조회</el-menu-item>
              <el-menu-item v-on:click="()=>{state=2}" index="1-2">동영상 목록 조회</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>api 테스트</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">Search</el-menu-item>
              <el-menu-item index="2-2">get</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div v-if="state===1">
        <h3 style="text-align:left">유튜버 목록 조회</h3>
        <el-input placeholder="Please input" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
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
</style>
