<template>
<div class="btn" @click="handlerclick"
 :class="{
      primary:type==='primary',
      success:type==='success',
      info:type === 'info'
  }">
<span :class="icon"></span>
<slot></slot>
</div>
</template>

<script>
export default {
  props: ['icon', 'type'],
  methods: {
    handlerclick() {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.btn{
width: 318*100vw/360;
height: 50px;
background-color:rgb(70, 158,12);
border-radius: 20px;
line-height: 50px;
text-align: center;
color: #fff;
font-weight: bold;
font-size: 20px;
}
</style>
