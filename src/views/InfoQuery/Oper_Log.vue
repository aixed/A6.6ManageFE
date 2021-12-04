<template>
  <div class="app-container">

    <b style="margin-left: 0px;">请选择日期范围：</b>

    <el-date-picker v-model="form.start_date" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" style="width: 20%;" />

    <b style="margin-left: 10px;margin-right: 10px;">-</b>

    <el-date-picker v-model="form.end_date" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" style="width: 20%;" />


    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>


    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="请稍后..."
      border
      fit
      highlight-current-row
      stripe
    >

      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.OPER_TIME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户ID"  width="95">
        <template slot-scope="scope">
          {{ scope.row.USER_ID }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名"  width="120">
        <template slot-scope="scope">
          {{ scope.row.USER_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户IP" width="120">
        <template slot-scope="scope">
          {{ scope.row.USER_IP }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="MAC地址" width="150">
        <template slot-scope="scope">
          {{ scope.row.MAC_ADDRESS }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作模块ID" width="140">
        <template slot-scope="scope">
          {{ scope.row.COMPO_ID }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作模块名" width="120">
        <template slot-scope="scope">
          {{ scope.row.COMPO_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="left" label="操作描述" >
        <template slot-scope="scope">
          {{ scope.row.OPER_DESC }}
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

export default {

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

  },
  methods: {

    cx(){


      console.log('起始时间：', this.form.start_date);
      console.log('结束时间：', this.form.end_date);

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
      let api_Url = "http://10.11.0.37:5209/api"
      const vm = this;

      vm.listLoading = true

      this.axios({
        method: 'GET',
        url: api_Url + '/InfoQuery/operlog',
        params: this.form,

      }).then(function (res){
        vm.listLoading = false
        console.log(res.data);
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

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
