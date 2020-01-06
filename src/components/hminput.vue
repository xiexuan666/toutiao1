<template>
<input
type="text"
class="hminput"
:class="{'success':statu,'error':!statu}"
@input='linlin'
@blur='xiexie'>
</template>

<script>
export default {
// rules:验证规则
// msg:如果输入不合法时就提示信息
  props: ['rules', 'msg'],
  data() {
    return {
      // 标记用户的输入是否合法
      statu: true
    };
  },
  methods: {
    //
    linlin(event) {
      let value = event.target.value
      console.log(value);
      // 正则的匹配方法
      if (this.rules && this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      this.$emit('input', value)
    },
    // 当失去焦点时，再次验证用户输入是否合法，如果不合法则给出正确的提示
    xiexie() {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail(this.msg || '输入不正确')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.hminput{
width: 318/360*100vw;
height: 60px;
outline:none;
border: none;
border-bottom: 3px solid #ccc;
font-size: 20px;
line-height: 60px;
}
.success{
border-bottom-color:green;
}
.error{
    border-bottom-color:red;
}
</style>
