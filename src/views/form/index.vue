<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="活动地址">
        <el-select v-model="form.region" placeholder="请选择你的活动区域">
          <el-option label="上海" value="shanghai" />
          <el-option label="西藏" value="xizang" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择一个日期" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="选择一个时间" style="width: 100%;" />
        </el-col>
      </el-form-item>


      <el-form-item label="是否自费">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动内容">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="聚餐" name="type" />
          <el-checkbox label="保健" name="type" />
          <el-checkbox label="唱歌" name="type" />
          <el-checkbox label="密室逃脱" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上" />
          <el-radio label="线下" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动说明">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

