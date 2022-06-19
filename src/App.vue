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
              <el-menu-item v-on:click="()=>{changState(1)}" index="1-1">유튜버 목록 조회</el-menu-item>
              <el-menu-item v-on:click="()=>{changState(2)}" index="1-2">동영상 목록 조회</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>api 테스트</template>
            <el-menu-item-group>
              <el-menu-item v-on:click="()=>{changState(3)}" index="2-1">Channels</el-menu-item>
              <el-menu-item v-on:click="()=>{changState(4)}" index="2-2">get</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div v-if="state">
        <h3 style="text-align:left">{{title}}</h3>
        <div v-if="state===3">
          <div class="searchbar">
            <el-input placeholder="채널 명" v-model="channelName" class="input-with-select">
              <template slot="prepend">?q=</template>
            </el-input>
          </div>
          <div class="searchbar">
            <el-input placeholder="결과 수(기본10)" v-model="maxResults" class="input-with-select">
              <template slot="prepend">?maxResults=</template>
            </el-input>
          </div>
          <div class="searchbar">
            <el-input size="medium" placeholder="구독자 00만 이상(기본10)" v-model="filter" class="input-with-select">
              <template slot="prepend">?filter=</template>
              <el-button v-on:click="searchChannel(channelName, maxResults, filter)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div v-if="resultArr" style="margin-top:20px">
            <el-table
              :data="resultArr"
              style="width: 100%">
              <el-table-column
                fixed
                label="Thumbnail"
                width="100">
                <template slot-scope="scope">
                  <img style="width: 70px; height: 70px" :src="scope.row.thumbnail">
                </template>
              </el-table-column>
              <el-table-column
                prop="Channelname"
                label="ChannelName"
                width="180">
              </el-table-column>
              <el-table-column
                prop="channelId"
                label="ChannelId"
                width="250">
              </el-table-column>
              <el-table-column
                label="스크랩수행"
                width="120">
              </el-table-column>
            </el-table>
          </div>
        </div>
        
        <!-- <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
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
      state: 0,
      title: '',
      channelName:'',
      maxResults:'',
      filter:'',
      searchResult: false,
      resultArr:[]
    }
  },
  methods: {
    sendRequest() {

    },
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
    },
    searchChannel(q, maxResults, filter) {
      const baseURI = 'http://34.64.113.15:5000';
      this.$http.get(`${baseURI}/channels`, {params: {q, maxResults, filter}})
      .then((result) => {
        console.log(result)
        this.resultArr = result.data.items
      })
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
</style>
