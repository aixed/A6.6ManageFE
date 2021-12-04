<template>
  <div class="app-container">

    <b style="margin-left: 0px;">年 度：</b>
      <el-select @change='change_nd' id="select_nd" v-model="nd" placeholder="选择年" >
        <el-option v-for="item in ndOptions" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>


    <b style="margin-left: 10px;">单位代码：</b>
    <el-input
      type="number"
      v-model="dw"
      class="dis_arrow"

      style="width: 200px;"
      placeholder="请输入单位代码"



    />

<!--    <b style="margin-left: 10px;">账套代码：</b>-->
<!--    <el-input-->
<!--      @mousewheel.native.prevent-->
<!--      type="number"-->
<!--      class="dis_arrow"-->
<!--      v-model="zt"-->
<!--      style="width: 200px;"-->
<!--      placeholder="输入账套代码"-->
<!--      onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"-->
<!--      min="0"-->
<!--      max="901"-->
<!--      oninput="if (value > 901) value = 901"-->
<!--      onblur="if(value.length!=3) this.focus();"-->
<!--      onkeyup="if(value.length=3) this.blur();"-->
<!--    />-->

    <b style="margin-left: 50px;">账 套：</b>
      <el-select @change='change_account_id' id="select_account_id" v-model="zt" placeholder="可选 选择账套" >
        <el-option v-for="item in ztOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>



    <b style="margin-left: 50px;">起始月份：</b>
    <el-select @change='change_month_start' id="select_month_start" v-model="month_start" placeholder="选择月份" >
      <el-option v-for="item in monthOptions" :key="item.label" :label="item.label" :value="item.value" />
    </el-select>

    <b style="margin-left: 50px;">结束月份：</b>
    <el-select @change='change_month_end' id="select_month_end" v-model="month_end" placeholder="选择月份" >
      <el-option v-for="item in monthOptions" :key="item.label" :label="item.label" :value="item.value" />
    </el-select>

    <el-button @click="cx" style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item" >查询</el-button>
    <br>
    <br>
    <b style="margin-left: 1px;margin-right: 10px;">包含年结凭证</b>
      <el-switch v-model="delivery"></el-switch>


    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="请稍等..."
      border
      fit
      highlight-current-row
      :row-style="{height: '0'}"
      :cell-style="{padding: '0'}"
      stripe
      :height="tableMaxHeight"
      :header-cell-style="{color: '#000000', fontSize: '14px'}"
      style="font-size: 14px"

    >


      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="yehzb-table-expand">

            <el-form-item  label="年度：">
              <span>{{ props.row.ND }}</span>
            </el-form-item>

            <!--            <el-form-item label="单位代码：">-->
            <!--              <span>{{ props.row.CO_CODE }}</span>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="单位名称：">-->
            <!--              <span>{{ props.row.CO_NAME }}</span>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="账套代码：">-->
            <!--              <span>{{ props.row.ACCOUNT_ID }}</span>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="账套名称：">-->
            <!--              <span>{{ props.row.ACCOUNT_NAME }}</span>-->
            <!--            </el-form-item>-->
            <el-form-item label="科目代码：">
              <span>{{ props.row.ACC_CODE }}</span>
            </el-form-item>
            <el-form-item label="科目名称：">
              <span>{{ props.row.ACC_NAME }}</span>
            </el-form-item>


            <el-form-item label="期初余额借方：">
              <span>{{ props.row.QCYE_JF }}</span>
            </el-form-item>
            <el-form-item label="期初余额贷方：">
              <span>{{ props.row.QCYE_DF }}</span>
            </el-form-item>


            <el-form-item label="本期发生借方：">
              <span>{{ props.row.BQFS_JF }}</span>
            </el-form-item>
            <el-form-item label="本期发生贷方：">
              <span>{{ props.row.BQFS_DF }}</span>
            </el-form-item>

            <el-form-item label="累计发生借方：">
              <span>{{ props.row.LJFS_JF }}</span>
            </el-form-item>
            <el-form-item label="累计发生贷方：">
              <span>{{ props.row.LJFS_DF }}</span>
            </el-form-item>
            <el-form-item label="期末余额借方：">
              <span>{{ props.row.QMYE_JF }}</span>
            </el-form-item>
            <el-form-item label="期末余额贷方：">
              <span>{{ props.row.QMYE_DF }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>




      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!--      <el-table-column label="年度" width="60" >-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.ND }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column label="单位代码"  width="95">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.CO_CODE }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column align="center" label="单位名称"  width="200" show-overflow-tooltip>-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.CO_NAME }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column align="center" label="账套代码" width="50">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.ACCOUNT_ID }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column align="center" label="账套名称" width="200" show-overflow-tooltip>-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.ACCOUNT_NAME }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column align="left" label="科目代码" width="110" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.ACC_CODE }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="科目名称" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.ACC_NAME }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="期初余额">
        <el-table-column align="center" label="借方" width="130">
          <template slot-scope="scope">
            {{ scope.row.QCYE_JF }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="贷方" width="130">
          <template slot-scope="scope">
            {{ scope.row.QCYE_DF }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" label="本期发生">
        <el-table-column align="center" label="借方" width="130">
          <template slot-scope="scope">
            {{ scope.row.BQFS_JF }}
          </template>
        </el-table-column>


        <el-table-column align="center" label="贷方" width="130">
          <template slot-scope="scope">
            {{ scope.row.BQFS_DF }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" label="累计发生">
        <el-table-column align="center" label="借方" width="130">
          <template slot-scope="scope">
            {{ scope.row.LJFS_JF }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="贷方" width="130">
          <template slot-scope="scope">
            {{ scope.row.LJFS_DF }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" label="期末余额">
        <el-table-column align="center" label="借方" width="130">
          <template slot-scope="scope">
            {{ scope.row.QMYE_JF }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="贷方" width="130">
          <template slot-scope="scope">
            {{ scope.row.QMYE_DF }}
          </template>
        </el-table-column>
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
      month_start: '',
      month_end: '',
      list: [],
      sel_zt: '',
      sel_nd: '',

      delivery: false,


      listLoading: false,
      ndOptions: [
        {key:'1',   label: '2019年', value: '2019' },
        {key:'2',   label: '2020年', value: '2020' },
        {key:'3',   label: '2021年', value: '2021' },
        {key:'4',   label: '2022年', value: '2022' }
      ],
      ztOptions: [
        { label: '110 企业职工基本养老保险', value: '110' },
        { label: '111 企业养老保险', value: '111' },
        { label: '116 职业年金', value: '116' },
        { label: '117 公务员医疗补助', value: '117' },
        { label: '120 机关事业单位养老保险', value: '120' },
        { label: '150 城乡居民养老险', value: '150' },
        { label: '340 居民医疗保险(社保）', value: '340' },
        { label: '341 城镇居民基本医疗保险科目体系（医疗）', value: '341' },
        { label: '400 职工医疗保险（社保）', value: '400' },
        { label: '401 职工基本医疗保险', value: '401' },
        { label: '700 生育保险', value: '700' },
        { label: '800 工伤保险', value: '800' },
        { label: '900 失业保险', value: '900' },
        { label: '901 职业技能提升', value: '901' }
      ],
      monthOptions: [
        { label: '1月', value: '1' },
        { label: '2月', value: '2' },
        { label: '3月', value: '3' },
        { label: '4月', value: '4' },
        { label: '5月', value: '5' },
        { label: '6月', value: '6' },
        { label: '7月', value: '7' },
        { label: '8月', value: '8' },
        { label: '9月', value: '9' },
        { label: '10月', value: '10' },
        { label: '11月', value: '11' },
        { label: '12月', value: '12' }
      ]

    }
  },

  created() {
    // this.fetchData()
  },
  computed: {
    tableMaxHeight() {
      return window.innerHeight - 200 + 'px';
    }
  },
  methods: {
    change_nd(value){
      let obj = {};

      //这里的 ndOptions 就是上面遍历的数据源
      obj = this.ndOptions.find((item)=>{
        //筛选出匹配数据
        return item.value === value;
      });
      console.log('选择年度key值', obj.key);
      console.log('当前选择年度值', obj.value);
      console.log('当前年度标签名', obj.label);
      this.sel_nd = obj.value;

    },
    change_account_id(value){
      this.sel_zt= value;
    },
    change_month_start(value){
      let obj = {};
      obj = this.monthOptions.find((item)=>{
        return item.value === value;
      });

      console.log('当前选择起始月值', obj.value);
      console.log('当前年度起始月名', obj.label);
      this.month_start = obj.value;
    },

    change_month_end(value){
      let obj = {};
      obj = this.monthOptions.find((item)=>{
        return item.value === value;
      });

      console.log('当前选择起始月值', obj.value);
      console.log('当前年度起始月名', obj.label);
      this.month_end = obj.value;
    },

    cx(){

      if(this.sel_nd == ''){
        console.log('开始查询,当前年度未选择！');
        alert('请选择年度！');
        return;
      }

      if(this.sel_zt == ''){
        console.log('开始查询,当前账套未选择！');
        alert('请选择账套！');
        return;
      }

      //if (this.dw == ''){
      //  alert('请输入单位代码！');
      //  return;
      //}

      if (this.zt == ''){
        alert('请输入账套代码！');
        return;
      }

      if(this.month_start == ''){
        alert('请输选择起始月份！');
        return;
        // this.sel_month = '01';
      }

      if(this.month_end == ''){
        alert('请输选择结束月份！');
        return;
      }
      // console.log(this.nd);
      // console.log(this.dw);
      // console.log(this.zt);

      // 开始请求数据

      //let api_Url = "/api"
      const vm = this;

      this.axios({
        method: 'GET',
        url: api_Url + '/InfoQuery/yehzb',


        params: {
          nd: this.sel_nd,
          dw: this.dw,
          zt: this.sel_zt,
          month_start: this.month_start,
          month_end: this.month_end,
          delivery: this.delivery,

        }
      }).then(function (res){
        console.log(res.data);

        if (res.data == '无数据'){
          console.log('无数据！');
          vm.$message('数据库中未查询到对应数据！');
          vm.list = null;
        }else {
          vm.list = res.data;
        }
      })

    },

    fetchData() {
      const vm = this;
      vm.listLoading = true

      this.axios({
        method: 'GET',
        url: vm.addr = api_Url + '/InfoQuery/yehzb',
        params: {
          nd: this.nd,
          dw: this.dw,
          zt: this.zt,
          month_start: this.month_start,
          month_end: this.month_end,
          delivery: this.delivery,
        },
        timeout: 20000,

      }).then(function (res){
        console.log(res.data);
        vm.listLoading = false
        if (res.data == '无数据'){
          vm.$message('数据库中未查询到对应数据！');
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

    }
  }
}
</script>

<style scoped>


/*表格展开行*/
.yehzb-table-expand {
  font-size: 0;
}
.yehzb-table-expand label {
  width: 50px;
  color: #99a9bf;
}
.yehzb-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}


</style>
