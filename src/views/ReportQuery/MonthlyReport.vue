<template>
 <div class="app-container">

   <b style="margin-left: 0px;">请选择月份：</b>
   <el-date-picker
     v-model="datavalue"
     type="month"
     format="yyyy-MM"
     value-format="yyyy-MM"
     placeholder="选择开始日期"
     style="width: 20%;" />

    <b style="margin-left: 10px;">单位代码：</b>
    <el-input
      type="number"
      v-model="dw"
      class="dis_arrow"

      style="width: 200px;"
      placeholder="请输入单位代码"

    />

    <b style="margin-left: 50px;">账 套：</b>
      <el-select @change='change_account_id' id="select_account_id" v-model="zt" placeholder="可选 选择账套" >
        <el-option v-for="item in ztOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>

    <el-button
      @click="cx"
      style="float: right;width: 100px;margin-left:20px"
      type="primary"
      icon="el-icon-search"
      class="filter-item" >进入</el-button>

    <el-button @click="cz" style="float: right;width: 100px;margin-left:0px"  class="filter-item" >重置</el-button>


    <el-tabs v-model="activeName" style="margin-top:15px;" @tab-click="handleClick">
      <el-tab-pane label="收支表" name="first" :key="first">
        <child1></child1>
      </el-tab-pane>

      <el-tab-pane label="指标（报表）" name="second" :key="second">
        <child2></child2>
      </el-tab-pane>

      <el-tab-pane label="指标（地方账）" name="third" :key="third">
        <child3></child3>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import select1 from './MonthlyReportDetail/MonthlyReportDetail_InExSt.vue'
import select2 from './MonthlyReportDetail/MonthlyReportDetail_ZB_St.vue'
import select3 from './MonthlyReportDetail/MonthlyReportDetail_Local_Z.vue'

export default {
  name: "MonthlyReport",
  components: {
    child1:select1,
    child2:select2,
    child3:select3,
  },

  data() {
    return {

      activeName: 'first',
      datavalue: '',
      dw: '',
      zt: '',
      sel_zt: '',
      sel_nd: '',

      listLoading: false,

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
    }
  },
  created() {
  },
  computed: {
  },
  methods: {

    change_account_id(value){
      this.sel_zt= value;
    },


    cx(){

      if(this.sel_zt == ''){
        console.log('开始查询,当前账套未选择！');
        alert('请选择账套！');
        return;
      }
      if(this.datavalue == ''){
        alert('请输选择月份！');
        return;
      }

    },
    cz(){
       alert('完成！');
      },
  },

}
</script>


<style>


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

/* 选中某行时的背景色*/
.el-table__body tr.current-row > td {
   background-color: #92cbf1 !important;
}

/*鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
   background-color: #92cbf1;
}
.el-table .cell.el-tooltip {
  white-space: pre-wrap;
}

</style>
