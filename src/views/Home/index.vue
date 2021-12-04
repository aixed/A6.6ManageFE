<template>
  <div class="Home-container">
    <img  src="../../assets/mainbg.jpg" class="id_img"/>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}


</script>

<style lang="scss">
.id_img{

  height: 60%;
  width: 100%;
}

// 去掉箭头 本代码必须放在全局第一个加载的组件里面 单独的组件里面不起作用
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
}
input[type="number"]{
  -moz-appearance:textfield;
}

</style>



