<template>
    <div style="height:100%">
        <h3 style="text-align:left">apis/contents</h3>
        <el-alert
            v-if="response==1"
            title="수행 성공!"
            type="success"
            show-icon>
        </el-alert>
        <el-alert
            v-if="response==-1"
            title="수행 실패"
            type="error"
            show-icon>
        </el-alert>
        <div class="searchbar">
            <el-input placeholder="채널 아이디" v-model="channelId" class="input-with-select">
                <template slot="prepend">?channelId=</template>
            </el-input>
        </div>
        <div class="searchbar">
            <el-input size="medium" placeholder="페이지토큰(없어도 됨)" v-model="pageToken" class="input-with-select">
                <template slot="prepend">?pageToken=</template>
                <el-button v-on:click="searchContents(channelId, pageToken)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div v-if="resultArr" style="margin-top:20px; height:100%">
            <el-table
            :data="resultArr"
            style="width: 100%; height:100%"
            empty-text="데이터 없음">
            <el-table-column
                fixed
                label="Thumbnail"
                width="120">
                <template slot-scope="scope">
                <img style="width: 120px; height: 90px" :src="scope.row.thumbnail">
                </template>
            </el-table-column>
            <el-table-column
                prop="video_name"
                label="video_name"
                width="350">
            </el-table-column>
            <el-table-column
                prop="hits"
                label="hits"
                width="100">
            </el-table-column>
            <el-table-column
                prop="comment_num"
                label="comments"
                width="100">
            </el-table-column>
            <el-table-column
                prop="state"
                label="state"
                width="100">
                <template slot-scope="scope">
                  <p> {{stateToString(scope.row.state)}} </p>
                </template>
            </el-table-column>
            <el-table-column
                label="수행"
                width="120">
                <template slot-scope="scope">
                    <el-row>
                        <el-button v-on:click="scrapeComments(scope.row.recognize)" plain>스크랩</el-button>
                    </el-row>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
      title: '',
      channelId:'',
      pageToken:'',
      maxResults:'',
      filter:'',
      searchResult: false,
      resultArr:[],
      response: 0
    }
    },
    methods:{
        scrapeComments(recognize){
            const baseURI = 'http://34.64.56.32:5000'
            this.$http.get(`${baseURI}/scrape`, {params: {recognize}})
            .then((result) => {
                if (result.data === 'success') {
                    this.response = 1
                } else {
                    this.response = -1
                }
                setTimeout(()=>{this.response = 0}, 1000)
            })
        },
        searchContents(channelId, pageToken='') {
            const fromDB=true;
            const baseURI = 'http://34.64.56.32:5000'
            this.$http.get(`${baseURI}/contents`, {params: {channelId, pageToken, fromDB}})
            .then((result) => {
                console.log(result)
                this.resultArr = result.data.data
            })
        },
        stateToString(state) {
          if (state==='1'){
            return '작업중'
          } else if (state==='-1'){
            return '수행 전'
          } else if (state==='0'){
            return '수행 중'
          } else if (state==='100'){
            return '수행 완료'
          }
        }
    }
}
</script>

<style>

</style>