<template>
  <div class="wrap">
    <h2 class="vertical-align: middle">西藏自治区收支表</h2>
    <p class="align-center">期间：{{msg}}</p>

    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      stripe
      highlight-current-row
      :row-style="selectedstyle"
      :cell-style="{padding: '5px 0'}"

      :height=tableWidth
      :header-cell-style="{color: '#000000', fontSize: '14px', 'text-align':'center'}"
      style="font-size: 15px; color: #000000; "
      @row-click="RowClick"
      :row-class-name="tableRowClassName"
    >


      <el-table-column align="left" label="项目" >
        <template slot-scope="scope">
          {{ scope.row.ACC_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="right" label="本期数"  width=300%>
        <template slot-scope="scope">
          {{ Number(scope.row.BQFS_JF)
            .toFixed(2)
            .toString()
            .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,") }}
        </template>
      </el-table-column>

      <el-table-column align="right" label="本年累计数" width=300%>
        <template slot-scope="scope">
          {{ Number(scope.row.LJFS_JF)
            .toFixed(2)
            .toString()
            .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,") }}
        </template>
      </el-table-column>




    </el-table>
  </div>
</template>

<script>
import api_Url from "@/httpConfig/api";


export default {
name: "child1",
  props: ["msg"],

  data() {
    return {
      nd: '2021',
      month: '1',
      dw: '549900001',
      zt: '111',

      list: [],
      listLoading: false,
      Address: '西藏自治区'
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
        url: vm.addr = api_Url + '/InfoQuery/ybszb',
        params: {
          nd: this.nd,
          dw: this.dw,
          zt: this.zt,
          month: this.month,
      }
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


<style scope>

.wrap {
text-align: center;
}

/*保留表格当中的空格*/
.el-table .cell.el-tooltip {
  white-space: pre-wrap;
}
</style>
