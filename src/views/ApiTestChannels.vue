<template>
    <div style="height:100%">
        <h3 style="text-align:left">apis/channels</h3>
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
                <template slot="prepend">?channelName=</template>
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
                <el-button v-on:click="()=>{addQueries(channelName, maxResults, filter);searchChannel(channelName, maxResults, filter)}" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
                <!-- <router-link :to="{name: 'ApiTestChannels', query:{ChannelName, maxResults, filter}}">
                    hi
                </router-link> -->
        <div v-if="resultArr" style="margin-top:20px;height:100%">
            <el-table
            :data="resultArr"
            style="width: 100%; height:100%"
            empty-text="데이터 없음">
            <el-table-column
                fixed
                label="Thumbnail"
                width="100">
                <template slot-scope="scope">
                <img style="width: 70px; height: 70px" :src="scope.row.thumbnail">
                </template>
            </el-table-column>
            <el-table-column
                prop="channelname"
                label="ChannelName"
                width="180">
            </el-table-column>
            <el-table-column
                prop="channelId"
                label="ChannelId"
                width="250">
            </el-table-column>
            <el-table-column
                label="추가"
                width="80">
                <template slot-scope="scope">
                <el-row>
                    <el-button v-on:click="addYoutuber(scope.row.channelId)" plain>추가</el-button>
                </el-row>
                </template>
            </el-table-column>
            <el-table-column
                label="이동"
                width="80">
                <template slot-scope="scope">
                <el-row>
                    <el-button v-on:click="toChannel(scope.row.channelId)" plain>이동</el-button>
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
            response: 0,
            baseURI:'http://34.64.56.32:5000'
        }
    },
    mounted () {
        this.$nextTick(
        function () {
            if (Object.keys(this.$route.query).length!==0) {
                this.searchChannel(this.$route.query.q, this.$route.query.maxResults, this.$route.query.filter)
            }
        }
        )
    },
    methods:{
        addYoutuber(CID){
            const baseURI = this.baseURI
            var data = {id:CID}
            this.$http.post(`${baseURI}/youtubers`, data)
            .then((result) => {
                if (result.data.response === 'save success!') {
                    this.response = 1
                } else {
                    this.response = -1
                }
                setTimeout(()=>{this.response = 0}, 1000)
            }).catch(()=>{
                this.response = -1
                setTimeout(()=>{this.response = 0}, 1000)
            })
        },
        addQueries(q, maxResults, filter) {
            this.$router.replace({
                path: this.$route.path,
                query: {
                    q, maxResults, filter
                }
            })
        },
        searchChannel(q, maxResults, filter) {
            const baseURI = this.baseURI
            this.$http.get(`${baseURI}/channels`, {params: {q, maxResults, filter}})
            .then((result) => {
                console.log(result)
                this.resultArr = result.data.items
            })
        },
        toChannel(channelId) {
            window.open(
                "https://www.youtube.com/channel/"+channelId,
                '_blank' // <- This is what makes it open in a new window.
            )
        }
    }
}
</script>

<style>

</style>