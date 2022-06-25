<template>
    <div>
        <h3 style="text-align:left">apis/get</h3>
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
                <template slot-scope="scope">
                <el-row>
                    <el-button v-on:click="addYoutuber(scope.row.channelId)" plain>채널 추가</el-button>
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
      channelName:'',
      maxResults:'',
      filter:'',
      searchResult: false,
      resultArr:[],
      response: 0
    }
    },
    methods:{
        addYoutuber(CID){
            const baseURI = 'http://localhost:5000'
            var data = {id:CID}
            this.$http.post(`${baseURI}/youtubers`, data)
            .then((result) => {
                if (result.data.response === 'save success!') {
                    this.response = 1
                } else {
                    this.response = -1
                }
                setTimeout(()=>{this.response = 0}, 1000)
            })
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

</style>