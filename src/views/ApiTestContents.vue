<template>
    <div style="height:100%">
        <h3 style="text-align:left">apis/contents</h3>
        <el-alert
            v-if="response==1"
            title="저장 성공!"
            type="success"
            show-icon>
        </el-alert>
        <el-alert
            v-if="response==-1"
            title="저장 실패"
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
        <el-row style="margin-top:15px">
            <el-button v-on:click="addContents(resultArr)" plain>전체 추가</el-button>
        </el-row>
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
                width="180">
            </el-table-column>
            <el-table-column
                prop="id"
                label="videoId"
                width="250">
            </el-table-column>
            <el-table-column
                label="추가"
                width="120">
                <template slot-scope="scope">
                <el-row>
                    <el-button v-on:click="addContents([{'cid':scope.row.cid, 'video_name':scope.row.video_name, 'thumbnail':scope.row.thumbnail, 'video_url': scope.row.video_url, 'hits':scope.row.hits, 'comment_num': scope.row.comment_num}])" plain>영상 추가</el-button>
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
        addContents(contArr){
            const baseURI = 'http://34.64.56.32:5000'
            var data = {contArr}
            this.$http.post(`${baseURI}/contents`, data)
            .then((result) => {
                if (result.data.response === 'save success!') {
                    this.response = 1
                } else {
                    this.response = -1
                }
                setTimeout(()=>{this.response = 0}, 1000)
            })
            console.log($route.query)
        },
        searchContents(channelId, pageToken='') {
            const baseURI = 'http://34.64.56.32:5000'
            this.$http.get(`${baseURI}/contents`, {params: {channelId, pageToken}})
            .then((result) => {
                console.log(result)
                this.resultArr = result.data.data
            })
        }
    }
}
</script>

<style>

</style>