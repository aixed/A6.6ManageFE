<template>
  <div class="app-container">

    <b style="margin-left: 10px;">单位名称：</b>
    <el-input
      type="text"
      v-model="form.co_name"
      style="width: 300px;"
      placeholder="可选 例：那曲"
    />


    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="载入中..."
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

      <el-table-column align="center" label="单位代码" width="200">
        <template slot-scope="scope">
          {{ scope.row.CO_CODE }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位名称"  >
        <template slot-scope="scope">
          {{ scope.row.CO_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上级单位代码" width="200">
        <template slot-scope="scope">
          {{ scope.row.PARENT_CO_CODE }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否末级单位" width="150">
        <template slot-scope="scope">
          {{ scope.row.IS_LOWEST }}
        </template>
      </el-table-column>




      <el-table-column fixed="right" label="操作" align="center" width="100" class-name="small-padding fixed-width">
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

  data() {
    return {
      form: {
        co_name: '',
      },

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


      const vm = this;
      vm.listLoading = true
      this.axios({
        method: 'GET',
        url: vm.addr = api_Url + '/InfoQuery/ALL_Unit',
        params: this.form,

      }).then(function (res){
        vm.listLoading = false
        // console.log(res.data);

        if (res.data == '无数据'){
          console.log('无数据')
          vm.$message('数据库中未查询到对应数据!');
          vm.list = null;
        }else {
          vm.list = res.data;
          let i;
          console.log('数据总量：', vm.list.length)

          for (i = 0; i <= vm.list.length -1; i++)
          {

            if (vm.list[i].IS_LOWEST == 'Y')
            {
              vm.list[i].IS_LOWEST  = '是'
            }
            else if (vm.list[i].IS_LOWEST  == 'N')
            {
              vm.list[i].IS_LOWEST  = '否'
            }

          }

        }
      }).catch(function(error){
        vm.listLoading = false
        vm.$message(
          {
            dangerouslyUseHTMLString: true,
            message: '接口调用错误!' +'<br/>' + url,
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
