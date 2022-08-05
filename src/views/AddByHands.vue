<template>
  <div>
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
      <el-input size="medium" placeholder="채널아이디" v-model="channelId" class="input-with-select">
          <template slot="prepend">채널아이디</template>
          <el-button v-on:click="()=>{add(channelId, pageToken)}" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>   
  </div>
</template>

<script>
export default {
    data(){
      return{
        channelId:'',
        baseURI:'http://34.64.56.32:5000',
        response:0
      }
    },
    methods: {
      add(CID){
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
      }
    }
}
</script>

<style>

</style>