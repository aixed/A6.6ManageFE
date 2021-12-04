<template>
  <div class="app-container">

    <b style="margin-left: 0px;">年 度：</b>
    <el-input
      type="number"
      v-model="nd"
      class="dis_arrow"
      style="width: 240px;"
      placeholder="年度,可使用鼠标滚轮调整"
      min="2017"
      max="2099"
      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
      oninput="if (value > 2099) value = 2099;"
      onblur="if(value.length!=4) this.focus();"
      onkeyup="if(value.length=4) this.blur();"
    />


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
      element-loading-text="马上就好..."
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

      <el-table-column label="年度" width="100" >
        <template slot-scope="scope">
          {{ scope.row.ND }}
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


      <el-table-column label="最后一次登陆时间" >
        <template slot-scope="scope">
          {{ scope.row.LASTLOGIN_TIME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="退出系统时间">
        <template slot-scope="scope">
          {{ scope.row.LASTLOGINOUT_TIME }}
        </template>
      </el-table-column>

      <el-table-column prop="kt" sortable align="center" label="总在线时长/小时" >
        <template slot-scope="scope">
          {{ (scope.row.ONLINE_TIME_MINUTE / 60).toFixed(2) }}
        </template>
      </el-table-column>



      <el-table-column prop="inc" sortable align="center" label="登录次数" width="150">
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
import api_Url from "@/httpConfig/api";
export default {

  data() {
    return {
      nd: '',
      uid: '',
      // "ND":"2020",
      // "USER_ID":"rkzcyh",
      // "LASTLOGIN_IP":"10.11.0.16",
      // "LASTLOGIN_TIME":"2020-12-31 20:34:06",
      // "LASTLOGINOUT_TIME":"2020-12-31 20:37:06",
      // "ONLINE_TIME_MINUTE":"7307",
      // "LOGIN_INC":"906"
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
        url: vm.addr = api_Url + '/InfoQuery/useryearuseinfo',
        params: {
          nd: this.nd,
          uid: this.uid,
        }
      }).then(function (res){
        console.log(res.data);
        vm.listLoading = false
        if (res.data == '无数据'){
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
