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
      placeholder="可选：输入账套代码"
      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
      min="0"
      max="901"
      oninput="if (value > 901) value = 901"
    />



    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>


    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="载入中..."
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

      <el-table-column label="年度" width="60" >
        <template slot-scope="scope">
          {{ scope.row.ND }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="会计期间" width="100" >
        <template slot-scope="scope">
          {{ scope.row.KJQJ }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位代码" width="150" >
        <template slot-scope="scope">
          {{ scope.row.DWDM }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位名称">
        <template slot-scope="scope">
          {{ scope.row.DWMC }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账套代码" width="100" >
        <template slot-scope="scope">
          {{ scope.row.ZTDM }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账套名称">
        <template slot-scope="scope">
          {{ scope.row.ZTMC }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="总凭证数" width="100" >
        <template slot-scope="scope">
          {{ scope.row.PZZS }}
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
      nd: '',
      dw: '',
      zt: '',
      list: [

      ],
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

      if (this.dw == ''){
        alert('请输入单位代码！');
        return;
      }



      // 开始请求数据

      let api_Url = "http://10.11.0.37:5209/api"
      const vm = this;

      vm.listLoading = true

      this.axios({
        method: 'GET',
        url: api_Url + '/InfoQuery/dzqbk_ay',
        params: {
          nd: this.nd,
          dw: this.dw,
          zt: this.zt,
        }

      }).then(function (res){
        // console.log(res.data);
        vm.listLoading = false
        if (res.data == '无数据'){
          vm.$message('数据库中未查询到对应数据!');
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


    fetchData() {

    }
  }
}
</script>
