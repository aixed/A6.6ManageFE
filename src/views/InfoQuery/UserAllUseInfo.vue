<template>
  <div class="app-container">

    <b style="margin-left: 10px;">用户ID：</b>

    <el-input
      type="text"
      placeholder="可选：输入用户ID"
      v-model="uid"
      style="width: 200px;"
    />

    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="载入中..."
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'inc', order: 'ascending'}"
      stripe
    >

      <el-table-column align="center" label="排名" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.USER_ID }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="访问服务器">
        <template slot-scope="scope">
          {{ scope.row.LASTLOGIN_IP }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="最后一次登陆时间" >
        <template slot-scope="scope">
          {{ scope.row.LASTLOGIN_TIME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="退出系统时间">
        <template slot-scope="scope">
          {{ scope.row.LASTLOGINOUT_TIME }}
        </template>
      </el-table-column>


      <el-table-column prop="inc" sortable align="center" label="登录次数" width="140">
        <template slot-scope="scope">
          {{ scope.row.LOGIN_INC }}
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" >
            查看详情
          </el-button>
        </template>
      </el-table-column>



    </el-table>
  </div>
</template>

<script>

export default {

  data() {
    return {
      uid:'',
      // "USER_ID":"sa",
      // "LASTLOGIN_IP":"10.11.0.16",
      // "LASTLOGIN_TIME":"2021-02-14 12:17:15",
      // "LASTLOGINOUT_TIME":"2021-02-14 12:20:15",
      // "LOGIN_INC":"3542"
      list: [],
      listLoading: false
    }
  },

  created() {
    this.fetchData()
  },
  methods: {


    cx(){

      // 开始请求数据
      // let api_Url = "http://rst.aixed.com:7003/api"
      let api_Url = "http://10.11.0.37:5209/api"
      const vm = this;
      vm.listLoading = true
      this.axios({
        method: 'GET',
        url: api_Url + '/InfoQuery/useralluseinfo',
        params: {
          uid: this.uid,
        }
      }).then(function (res){
        // console.log(res.data);
        vm.listLoading = false
        if (res.data == '无数据'){
          vm.$message('数据库中未查询到对应数据！');
          vm.list = null;
        }else {
          vm.list = res.data;
        }
      }).catch(function(error){
        vm.listLoading = false
        vm.$message.error('接口调用错误!');
        console.log("执行错误",error);
      })

    },
    fetchData(){
      this.cx();
    },

  }
}
</script>

