<template>
  <div class="app-container">

    <b>总计在线人数：{{list.length}}</b>
    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      stripe
      highlight-current-row
    >

      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.USER_ID }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名"  width="120">
        <template slot-scope="scope">
          {{ scope.row.USER_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="IP地址"  width="150">
        <template slot-scope="scope">
          {{ scope.row.IP }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录时间" >
        <template slot-scope="scope">
          {{ scope.row.CREATE_TIME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="在线时长/小时" >
        <template slot-scope="scope">
<!--          {{ scope.row.ONLINE_TIME / 60 / 60}}-->
          {{Math.floor(scope.row.ONLINE_TIME / 60 / 60 * 100) / 100}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位代码" width="150">
        <template slot-scope="scope">
          {{ scope.row.CO_CODE }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位名称" >
        <template slot-scope="scope">
          {{ scope.row.CO_NAME }}
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
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
import api_Url from "@/httpConfig/api";
export default {
name: "AnnualReportDetail_IncomeExpenses_Statement",

  data() {
    return {
      form: {
        start_date: '',
        end_date: '',
      },

      list: [],

      listLoading: false,

    }
  },

  created() {
    this.fetchData()
  },
  methods: {

    cx(){

      if (this.nd == ''){
        alert('请输入年度！');
        return;
      }

      if (this.dw == ''){
        alert('请输入单位代码！');
        return;
      }

      if (this.zt == ''){
        alert('请输入账套代码！');
        return;
      }

      // 开始请求数据


      const vm = this;
      vm.listLoading = true
      this.axios({
        method: 'GET',
        url: vm.addr = api_Url + '/InfoQuery/OnlineStatistics',
        params: this.form,

      }).then(function (res){
        vm.listLoading = false
        console.log('返回数据：',res);

        if (res.data == '无数据'){
		  vm.listLoading = false
          console.log('无数据')
          vm.$message('数据库中未查询到对应数据!');
          vm.list = null;
        }else {
          vm.list = res.data;
        }
      }).catch(function(error){

        vm.listLoading = false

        vm.$message(
          {
            dangerouslyUseHTMLString: true,
            message: '接口调用错误!' +'<br/>' + vm.addr,
            type:'error'
          });

        console.log("执行错误",error);
      })

    },

    fetchData() {
    this.cx()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
