<template>
  <input
    type="text"
    class="hminput"
    :class="{'success':statu,'error':!statu}"
    @input="panduan"
    @blur="shijiao"
  />
</template>

<script>
export default {
  props: ['rules', 'msg'],
  data() {
    return {
      statu: true
    };
  },
  methods: {
    panduan(event) {
      // eslint-disable-next-line no-console
      console.log(event.target.value);
      let value = event.target.value
      // 同时还将当前输入框的内容传给父组件
      if (this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      // 告诉父组件,输入内容变化了
      this.$emit('input', value)
    },
    shijiao() {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        // console.log(this.msg || '输入不正确')
        this.$toast.fail(this.msg || '输入不正确')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hminput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: rgb(128, 0, 107);
}
.error {
  border-bottom-color: rgb(255, 145, 0);
}
</style>
