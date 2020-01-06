<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hminput
          placeholder="请输入用户名/手机号"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          msg="用户名或者手机号输入不正确"
          :value="users.username"
          @input="xuan"
        ></hminput>
        <hminput
          placeholder="请输入密码"
          :rules="/^\S{3,16}$/"
          msg="请输入3-16位的密码"
          v-model="users.password"
        ></hminput>

        <p class="tips">
          没有账号？
          <a href="#/register" class="">去注册</a>
        </p>
        <hmbutton @click="login" type="success">登录</hmbutton>
      </div>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hmbutton.vue';
import hminput from '@/components/hminput.vue';
import { login } from '@/apis/user.js';
export default {
  components: {
    hmbutton,
    hminput
  },
  data() {
    return {
      users: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      // 实现验证
      if (
        /^(\d{5,6})$|^(1\d{10})$/.test(this.users.username) &&
        /^\S{3,16}$/.test(this.users.password)
      ) {
        // await和async组合可以直接拿到.then和.catch的结果,然后直接赋值给res
        // async:标志当前方法有异步操作
        // await:可以拿到回调函数中的结果
        let res = await login(this.users);
        console.log(res);
        if (res.data.message === '用户不存在') {
          // 用户提示
          this.$toast.fail(res.data.message);
        } else {
          // 将当前页面跳转 存token
          localStorage.setItem('toutiao_77_token', res.data.data.token);
          // 将数据保存到本地存储
          localStorage.setItem('toutiao_77_token', JSON.stringify(res.data.data.users))
          // 实现页面跳转
          this.$router.push({ path: `/personal/${res.data.data.token}` })
          // 存储到本地
          localStorage.setItem(
            'toutiao_66_token',
            JSON.stringify(res.data.data.users)
          );
        }
      } else {
        this.$toast.fail('数据输入的不正确');
      }
    },
    xuan(data) {
      this.users.username = data;
    }
  }
};
</script>

<style lang="less" scoped>
.xiexuan {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
