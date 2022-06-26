<template>
  <div v-if="resultArr" style="margin-top:20px;height:100%">
    <h3 style="text-align:left">유튜버 목록 조회</h3>
    <el-alert
        v-if="response==1"
        title="삭제 성공!"
        type="success"
        show-icon>
    </el-alert>
    <el-alert
        v-if="response==-1"
        title="저장 실패"
        type="error"
        show-icon>
    </el-alert>
    <el-table
      :data="resultArr"
      style="width: 100%;height:100%"
      empty-text="데이터 없음">
      <el-table-column
          fixed
          label="Thumbnail"
          width="100">
          <template slot-scope="scope">
            <img style="width: 70px; height: 70px" :src="scope.row.profile">
          </template>
      </el-table-column>
      <el-table-column
          prop="channel"
          label="ChannelName"
          width="180">
      </el-table-column>
      <el-table-column
          prop="id"
          label="ChannelId"
          width="250">
      </el-table-column>
      <el-table-column
          label="채널삭제"
          width="120">
          <template slot-scope="scope">
          <el-row>
              <el-button v-on:click="delYoutuber(scope.row.id)" plain>채널 삭제</el-button>
          </el-row>
          </template>
      </el-table-column>
      <el-table-column
          label="이동"
          width="120">
          <template slot-scope="scope">
          <el-row>
              <el-button v-on:click="toChannel(scope.row.id)" plain>이동</el-button>
          </el-row>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    mounted () {
      this.$nextTick(
      function () {
          const baseURI = this.baseURI
          this.$http.get(`${baseURI}/youtubers`)
          .then((result) => {
              this.resultArr = result.data.result
          })
      }
      )
    },
    data() {
        return {
            title: '',
            channelName:'',
            maxResults:'',
            filter:'',
            searchResult: false,
            resultArr: [],
            response: 0,
            // baseURI:'http://localhost:5000'
            baseURI:'http://34.64.56.32:5000'
        }
    },
  methods:{
        delYoutuber(CID){
            const baseURI = this.baseURI
            this.$http.delete(`${baseURI}/youtubers`, {
              data: {
                id: CID
              }
            }).then((result) => {
                if (result.data.response === 'delete success!') {
                    this.response = 1
                    for(var i = 0; i < this.resultArr.length; i++){ 
                      if (this.resultArr[i].id === CID) { 
                        this.resultArr.splice(i, 1); 
                        i--; 
                      }
                    }
                } else {
                    this.response = -1
                }
                setTimeout(()=>{this.response = 0}, 1000)
            }).catch(()=>{
                this.response = -1
                setTimeout(()=>{this.response = 0}, 1000)
            })
        },
        // getYoutuberList(){
        //     const baseURI = this.baseURI
        //     this.$http.get(`${baseURI}/youtubers`)
        //     .then((result) => {
        //         this.resultArr = result.data.item
        //     })
        // },
        // searchChannel(q, maxResults, filter) {
        //     const baseURI = this.baseURI
        //     this.$http.get(`${baseURI}/channels`, {params: {q, maxResults, filter}})
        //     .then((result) => {
        //         this.resultArr = result.data.items
        //     })
        // },
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