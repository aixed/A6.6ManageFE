<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.data"
      element-loading-text="请在给我多一点点时间"
      border
      fit
      highlight-current-row
      stripe
      :default-sort = "{prop: 'userid', order: 'ascending'}"
    >

      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="row编号" sortable label="编号" width="120">
        <template slot-scope="scope">
          {{ scope.row.ROWNO }}
        </template>
      </el-table-column>

      <el-table-column prop="userid" sortable label="用户编码" width="120">
        <template slot-scope="scope">
          {{ scope.row.USER_ID }}
        </template>
      </el-table-column>

      <el-table-column label="IP地址" width="150">
        <template slot-scope="scope">
          {{ scope.row.Ipaddr }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="最后一次登陆时间">
        <template slot-scope="scope">
          {{ scope.row.LoginTime }}
        </template>
      </el-table-column>

      <el-table-column  align="center" label="退出系统时间">
        <template slot-scope="scope">
          {{ scope.row.LoginOutTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">

          <el-button
            type="text"
            size="mini"
            @click="more(row)"
          >
            查看详情
          </el-button>

        </template>
      </el-table-column>

    </el-table>



    <el-pagination
      class="text-right pagination"
      :v-show="list.total > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="list.curPageNum"
      :page-sizes="[10, 14, 25, 50, 100]"
      :page-size.sync="list.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total.sync="list.total">
    </el-pagination>


    <el-dialog
      title="详情"
      :visible.sync="dialogFormVisible"
      width="500px"
      :before-close="xq_Close">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="用户ID">
          <el-input :disabled="true" v-model="temp.USER_ID" />
        </el-form-item>

        <el-form-item label="IP地址">
          <el-input :disabled="true" v-model="temp.Ipaddr" />
        </el-form-item>

        <el-form-item label="登陆时间">
          <el-input :disabled="true" v-model="temp.LoginTime" />
        </el-form-item>

        <el-form-item label="退出时间">
          <el-input :disabled="true" v-model="temp.LoginOutTime" />
        </el-form-item>

      </el-form>



    <span slot="footer" class="dialog-footer">
    <el-button @click="xq_cancel()">取 消</el-button>
    <el-button type="primary" @click="xq_ok()">确 定</el-button>
    </span>

    </el-dialog>


  </div>
</template>



<script>


export default {

  data() {
    return {

      dialogFormVisible: false,
      temp: {
        Ipaddr: '',
        LoginOutTime: '',
        LoginTime: '',
        USER_ID: '',
      },

      list: {
        total: 0,
        pageSize: 10,
        curPageNum: 1,
        order: 'asc',
        orderIndex: '序号',
        searchKey: null,
        searchValue: null,

        filterIndex: null,
        data:[]
      },
      listLoading: false,

    }
  },

  created() {
    this.fetchData()

    // 获取完数据后 表格设置为显示第一页。 每行显示10条数据
    this.list.curPageNum = Number(sessionStorage.getItem('curPage')) || 1
    this.list.pageSize = Number(sessionStorage.getItem('pagesize')) || 10


  },
  beforeUpdate() {
    sessionStorage.setItem('curPage', this.list.curPageNum)
    sessionStorage.setItem('pagesize', this.list.pageSize)
  },

  beforeDestroy() {
    sessionStorage.setItem('curPage', '1')
    sessionStorage.setItem('pagesize','10')
  },



  methods: {
    xq_Close(){

      this.dialogFormVisible = false

    },
    xq_ok(){
      this.dialogFormVisible = false
    },
    xq_cancel(){
      this.dialogFormVisible = false
    },
    more(row){
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row)
      // console.log(this.temp);


    },


    handleCurrentChange (val) {
      this.list.curPageNum = val
      sessionStorage.setItem('curPage',val)
      // console.log('当前选择页：',this.list.curPageNum);
      this.list.data = undefined;

      this.fetchData();
    },
    handleSizeChange (value) {
      this.list.pageSize = value
      this.list.curPageNum = 1
      sessionStorage.setItem('pagesize',value)
      // console.log('当前分页依据数：',this.list.pageSize);
      this.list.data = undefined;
      this.fetchData();
    },

    fetchData() {
      console.log('当前选择页：',this.list.curPageNum);
      console.log('当前分页依据数：',this.list.pageSize);
      // this.listLoading = true;

      let api_Url = "http://10.11.0.37:5209/api"

      const vm = this;
      vm.listLoading = true
        this.axios({
          method: 'GET',
          url: api_Url + '/InfoQuery/LoginList',
          params: {
            Page_Size: this.list.pageSize,
            cur_PageNum: this.list.curPageNum,
          }


        }).then(function (response){
		  vm.listLoading = false

		  console.log('返回数据：', response.data)
		  if (response.data == '无数据'){
            console.log('无数据')
            vm.$message('数据库中未查询到对应数据!');
            vm.list = null;
		  }else {
			console.log('取回数据 config：',response.data.config);
            console.log('取回数据 total：',response.data.config.total);
            console.log('取回数据 pageSize：',response.data.config.pageSize);
            console.log('取回数据 curPageNum：',response.data.config.curPageNum);

			vm.list.total = response.data.config.total;
            vm.list.pageSize = response.data.config.pageSize;
            vm.list.curPageNum = response.data.config.curPageNum;

            vm.list.data = response.data.data;
		  }



        }).catch(function(error){
          vm.listLoading = false
          vm.$message.error('接口调用错误!');
          console.log("执行错误",error);
        })

    }
  }
}
</script>
