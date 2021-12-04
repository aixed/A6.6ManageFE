<template>
  <div class="app-container">



      <b style="margin-left: 0px;">年 度：</b>
      <el-select @change='change_nd' id="select_nd" v-model="form.nd" placeholder="选择年" >
        <el-option v-for="item in ndOptions" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>

      <b style="margin-left: 50px;">月 份：</b>
      <el-select @change='change_month' id="select_month" v-model="form.month" placeholder="选择月份" >
        <el-option v-for="item in monthOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>

      <b style="margin-left: 50px;">账 套：</b>
      <el-select @change='change_account_id' id="select_account_id" v-model="form.ACCOUNT_ID" placeholder="可选 选择账套" >
        <el-option v-for="item in ztOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>


      <b style="margin-left: 10px;">单位代码：</b>
      <el-input
        type="number"
        v-model="dw"
        style="width: 200px;"
        placeholder="可选 输入单位代码"
        @mousewheel.native.prevent
        oninput="if (value > 549912003) value = 549912003;"
        onblur="if(value.length!=9) this.focus();"
        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8"
        onkeyup="if(value.length=9) this.blur();"
      />

      <el-button style="float: right;width: 100px;margin-left:0px" type="primary" icon="el-icon-search" class="filter-item"  @click="QueryPZBH">查询</el-button>

<!--    <div>-->
<!--      <span>-->
<!--        数量：-->
<!--        <strong>{{ list.length }}</strong>-->
<!--      </span>-->
<!--    </div>-->



    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据太多，正在加载中..."
      border
      fit
      highlight-current-row
      stripe
      ref="t1"
      style="width:100%"
    >


      <el-table-column prop="items" type="expand">
        <template slot-scope="scope">

          <el-table
            :data="scope.row.detail"
            stripe
            style="width:100%"
            ref="t2"
          >



            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="pzbh-table-expand">

                  <el-form-item  label="附件张数：">
                    <span>{{ props.row.acce_cnt }}</span>
                  </el-form-item>

                  <el-form-item label="录入人：">
                    <span>{{ props.row.INPUTOR }}</span>
                  </el-form-item>

                  <el-form-item label="录入日期：">
                    <span>{{ props.row.CDATE }}</span>
                  </el-form-item>

                  <el-form-item label="审核人：">
                    <span>{{ props.row.auditor }}</span>
                  </el-form-item>

                  <el-form-item label="审核日期：">
                    <span>{{ props.row.adate }}</span>
                  </el-form-item>

                  <el-form-item label="记账人：">
                    <span>{{ props.row.poster }}</span>
                  </el-form-item>

                  <el-form-item label="记账日期：">
                    <span>{{ props.row.post_date }}</span>
                  </el-form-item>

                  <el-form-item label="修改日期：">
                    <span>{{ props.row.modifytime }}</span>
                  </el-form-item>

                  <el-form-item label="会计主管：">
                    <span>{{ props.row.fileader }}</span>
                  </el-form-item>

                  <el-form-item label="凭证状态：">
                    <span>{{ props.row.status }}</span>
                  </el-form-item>



                </el-form>
              </template>
            </el-table-column>





            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="VOU_NO" width="110px" align="center" label="凭证编号" ></el-table-column>
            <el-table-column prop="VOU_DATE" width="120px" align="center" label="凭证日期" ></el-table-column>
            <el-table-column prop="VOU_DESC" label="凭证摘要" ></el-table-column>
            <el-table-column prop="AMT_CR" label="凭证金额" width="130px" align="left" ></el-table-column>
            <el-table-column prop="VOU_SOURCE" width="100px" align="center" label="凭证来源" ></el-table-column>
            <el-table-column prop="PRINT_STATUS" width="100px" align="center" label="打印状态" ></el-table-column>
            <el-table-column prop="INPUTOR" width="100px" align="center" label="制单人" ></el-table-column>


            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="100px"
              class-name="small-padding fixed-width">

              <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="xq_2(row)">
                  详情
                </el-button>

              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>


      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>



      <el-table-column label="年度"   width="100px">
        <template slot-scope="scope">
          {{ scope.row.ND }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="月份" width="100px">
        <template slot-scope="scope">
          {{ scope.row.MOUTH }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="账套代码" width="100px" >
        <template slot-scope="scope">
          {{ scope.row.ACCOUNT_ID }}
        </template>
      </el-table-column>

      <el-table-column label="单位代码" width="100px" >
        <template slot-scope="scope">
          {{ scope.row.CO_CODE }}
        </template>
      </el-table-column>

      <el-table-column label="单位名称" >
        <template slot-scope="scope">
          {{ scope.row.CO_NAME }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="当前凭证编号" width="140px" >
        <template slot-scope="scope">
          {{ scope.row.CUR_INDEX }}
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button @click="xq_1(row)" type="primary" size="mini" icon="el-icon-chat-dot-square">
            明细
          </el-button>
          <el-button type="primary" style="background: coral" size="mini" icon="el-icon-edit">
            编辑
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
      list: [],

      form: {
        nd: '',
        month:'00',
        CO_CODE: '',
        ACCOUNT_ID: ''
      },
      ndOptions: [
        {key:'1',   label: '2019年', value: '2019' },
        {key:'2',   label: '2020年', value: '2020' },
        {key:'3',   label: '2021年', value: '2021' },
        {key:'4',   label: '2022年', value: '2022' }
      ],
      monthOptions: [
        { label: '全部', value: '00' },
        { label: '1月', value: '01' },
        { label: '2月', value: '02' },
        { label: '3月', value: '03' },
        { label: '4月', value: '04' },
        { label: '5月', value: '05' },
        { label: '6月', value: '06' },
        { label: '7月', value: '07' },
        { label: '8月', value: '08' },
        { label: '9月', value: '09' },
        { label: '10月', value: '10' },
        { label: '11月', value: '11' },
        { label: '12月', value: '12' }
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
      listLoading: false,

      sel_nd: '',
      sel_month: '',
      sel_zt: '',
      dw: '',
    }
  },

  created() {
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
    change_month(value){
      let obj = {};
      obj = this.monthOptions.find((item)=>{
        return item.value === value;
      });

      console.log('当前选择年度值', obj.value);
      console.log('当前年度标签名', obj.label);
      this.sel_month = obj.value;
    },
    change_account_id(value){
      this.sel_zt= value;
    },

    QueryPZBH(){
      if(this.sel_nd == ''){
        console.log('开始查询,当前年度未选择！');
        alert('请选择年度！');
        return;
      }
      // 如果没有选择月份 则默认赋值为00 代表所有月份
      if(this.sel_month == ''){
        console.log('开始查询,当前月份未选择！');
        this.sel_month = '00';
      }


      console.log('开始查询,当前提交年度：',this.sel_nd);
      console.log('开始查询,当前提交月份：',this.sel_month);
      console.log('开始查询,当前提交账套：',this.sel_zt);
      console.log('开始查询,当前提交单位：',this.dw);

      //  这里开始 axios 请求

      const vm = this;
      vm.listLoading = true
        this.axios({
          method: 'GET',
          url: vm.addr = api_Url + '/InfoQuery/pzbh',
          params: {
            nd: this.sel_nd,
            yf: this.sel_month,
            zt: this.sel_zt,
            dw: this.dw,
          }

        }).then(function (res){
          vm.listLoading = false
          console.log('返回数据：', res.data.base)
          if (res.data == '无数据'){
            console.log('无数据')
            vm.$message('数据库中未查询到对应数据!');
            vm.list = null;
          }else {

            vm.list = res.data.base;

            let i,ii;
            console.log('数据总量：', vm.list.length)

            for (i = 0; i <= vm.list.length -1; i++)
            {
              for (ii = 0; ii <= vm.list[i].detail.length -1; ii++)
              {
                // 凭证打印状态
                console.log('明细', vm.list[i].detail[ii].PRINT_STATUS)
                if (vm.list[i].detail[ii].PRINT_STATUS == '2')
                {
                  vm.list[i].detail[ii].PRINT_STATUS = '已打印'
                }
                else if (vm.list[i].detail[ii].PRINT_STATUS == '1')
                {
                  vm.list[i].detail[ii].PRINT_STATUS = '未打印'
                }

                // 凭证来源
                if (vm.list[i].detail[ii].VOU_SOURCE == 'Entered')
                {
                  vm.list[i].detail[ii].VOU_SOURCE = '手工录入'
                }
                else if (vm.list[i].detail[ii].VOU_SOURCE == 'Generated')
                {
                  vm.list[i].detail[ii].VOU_SOURCE = '系统生成'
                }
                else if (vm.list[i].detail[ii].VOU_SOURCE == 'CU')
                {
                  vm.list[i].detail[ii].VOU_SOURCE = '从出纳生成'
                }


                // 凭证状态
                if (vm.list[i].detail[ii].status == 'Posted')
                {
                  vm.list[i].detail[ii].status = '已记账'
                }
                else if (vm.list[i].detail[ii].status == 'Audit')
                {
                  vm.list[i].detail[ii].status = '已审核'
                }
                else if (vm.list[i].detail[ii].status == 'Canceled')
                {
                  vm.list[i].detail[ii].status = '已作废'
                }
                else if (vm.list[i].detail[ii].status == 'Open')
                {
                  vm.list[i].detail[ii].status = '未记账'
                }

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
    xq_1(row){
      this.$refs.t1.toggleRowExpansion(row)
    },
    xq_2(row){
      this.$refs.t2.toggleRowExpansion(row)
    },


  }
}
</script>


<style scoped>




/*google浏览器下禁用箭头*/
/*input::-webkit-outer-spin-button,*/
/*input::-webkit-inner-spin-button {*/
/*  margin: 0;*/
/*  -webkit-appearance: none !important;*/
/*}*/

/*input input[type="number"]::-webkit-outer-spin-button,*/
/*input input[type="number"]::-webkit-inner-spin-button {*/
/*  margin: 0;*/
/*  -webkit-appearance: none !important;*/
/*}*/


/*!*在firefox下移除input[number]的上下箭头*!*/
/*.dis_arrow_pzbh {*/
/*  -moz-appearance: textfield;*/
/*}*/

/*.dis_arrow_pzbh input[type="number"] {*/
/*  -moz-appearance: textfield;*/
/*}*/

#select_nd{
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  width: 100px;
}
#select_month{
  width: 80px;
}
#select_account_id{
  width: 360px;
}



/*表格展开行*/
.pzbh-table-expand {
  font-size: 0;
}
.pzbh-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.pzbh-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}



</style>

