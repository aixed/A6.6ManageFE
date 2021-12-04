<template>
  <div class="app-container">


    <b style="margin-left: 0px;">年 度：</b>
    <el-input
      type="number"
      v-model="nd"
      class="dis_arrow"
      style="width: 240px;"
      placeholder="年度,可使用鼠标滚轮调整"
      min="2014"
      max="2099"
      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
      oninput="if (value > 2099) value = 2099;"
      onblur="if(value.length!=4) this.focus();"
      onkeyup="if(value.length=4) this.blur();"
    />



    <b style="margin-left: 10px;">单位代码：</b>
    <el-input
      type="number"
      v-model="dw"
      class="dis_arrow"
      style="width: 200px;"
      placeholder="请输入单位代码"
      @mousewheel.native.prevent
      oninput="if (value > 549912003) value = 549912003;"
      onblur="if(value.length!=9) this.focus();"
      onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
      onkeyup="if(value.length=9) this.blur();"
    />


    <b style="margin-left: 10px;">账套代码：</b>
    <el-input
      @mousewheel.native.prevent
      type="number"
      class="dis_arrow"
      v-model="zt"
      style="width: 200px;"
      placeholder="输入账套代码"
      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
      min="0"
      max="901"
      oninput="if (value > 901) value = 901"
      onblur="if(value.length!=3) this.focus();"
      onkeyup="if(value.length=3) this.blur();"
    />

    <b style="margin-left: 10px;">用户ID：</b>
    <el-input
      type="text"
      style="width: 200px;"
      placeholder="可选：输入用户ID"
      v-model="uid"
    />


    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>


    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在读取..."
      border
      fit
      highlight-current-row
      stripe
    >

      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="年度" width="60" >
        <template slot-scope="scope">
          {{ scope.row.year }}
        </template>
      </el-table-column>

      <el-table-column label="单位代码" width="100">
        <template slot-scope="scope">
          {{ scope.row.org_id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.CO_NAME }}
        </template>
      </el-table-column>

      <el-table-column label="账套代码" width="80">
        <template slot-scope="scope">
          {{ scope.row.accountset }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账套名称" >
        <template slot-scope="scope">
          {{ scope.row.COA_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" >
        <template slot-scope="scope">
          {{ scope.row.USER_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.USER_ID }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账簿代码" >
        <template slot-scope="scope">
          {{ scope.row.accountcode }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账簿名称">
        <template slot-scope="scope">
          {{ scope.row.accountbook }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账簿科目">
        <template slot-scope="scope">
          {{ scope.row.subject }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="银行名">
        <template slot-scope="scope">
          {{ scope.row.bank }}
        </template>
      </el-table-column>

	   <el-table-column align="center" label="银行卡号">
        <template slot-scope="scope">
          {{ scope.row.account_number }}
        </template>
      </el-table-column>

	  <el-table-column align="center" label="开户行地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
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
import api_Url from "@/httpConfig/api";
export default {

  data() {
    return {
      nd: '',
      dw: '',
      zt: '',
      uid: '',


      list: [],

      listLoading: false
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






      // 开始请求数据


      const vm = this;
      vm.listLoading = true
      this.axios({
        method: 'GET',
        url: vm.addr = api_Url + '/InfoQuery/bankaccount',
        params: {
          nd: this.nd,
          dw: this.dw,
          zt: this.zt,
          uid: this.uid,
        }
      }).then(function (res){
        console.log(res.data);
        vm.listLoading = false
        if (res.data == '无数据'){
          console.log('无数据！');
          vm.$message('数据库中未查询到对应数据！');
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
    }
  }
}
</script>

