<template>
  <div class="editPersonal">
<hmheader title='编辑个人信息'>
        <span class="iconfont iconjiantou2" slot='left'  @click="$router.back()"></span>
</hmheader>
<div class="img">
<img :src="currentUser.header_img" alt/>
 <van-uploader :after-read="afterRead"/>
 </div>
<hmcell title="昵称" :desc='currentUser.nickname' @click="nickshow=!nickshow"></hmcell>
 <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>
<hmcell title="密码" :desc='currentUser.password' type="password" @click="password=!password"></hmcell>
<van-dialog
      v-model="passshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field ref="originPass" placeholder="请输入原密码" required label="原密码" />
      <van-field ref="newPass" placeholder="请输入新密码" required label="新密码" />
    </van-dialog>
 <hmcell title="性别" :desc="currentUser.gender===0?'女':'男'" @click="gendershow=!gendershow"></hmcell>
<van-dialog  v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
   <van-picker :columns="['女','男']" :default-index="currentUser.gender" @change="onChange" />
</van-dialog>

  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'
import hmcell from '@/components/hmcell.vue'
import { getUserById, updateUserById } from '@/apis/user.js'; // updateUserById
import { fileimg } from '@/apis/upload.js';
export default {
  components: {
    hmheader, hmcell
  },
  data() {
    return {
      currentUser: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      gender: ''
    };
  },
  mounted() {
    this.getUserById()
  },
  methods: {
    // 当用户选择完文件之后触发
    async afterRead(file) {
      // file是当前文件
      let fromdata = new FormData();
      fromdata.append('file', file.file);
      let res = await fileimg(fromdata);
      if (res.data.message === '文件上传成功') {
        // 实现图片预览
        this.currentUser.header_img = 'http//:127.0.0.1:3000' + res.data.data.url;
        // 再次发个请求实现更换图片
        let res1 = await updateUserById(this.currentUser.id, {
          header_img: res.data.data.url
        });
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改成功');
        } else {
          this.$toast.fail('修改失败');
        }
      } else {
        this.$toast.fail('文件上传失败');
      }
    },
    // 修改昵称
    async updateNickname() {
    // 获取用户输入的内容   input:封装的van-filed中，文本框的ref值就是input
      let name = this.$refs.nick.$refs.input.value;
      // 更新
      let res = await updateUserById(this.currentUser.id, {
        nickname: name
      });
      if (res.data.message === '修改成功') {
      // 刷新页面
        this.currentUser.nickname = name;
        this.$toast.success('修改成功')
      } else {
        this.$fail('修改失败')
      }
    },
    // 修改密码
    async updatePassword () {
    // 获取用户输入的原密码，判断和用户密码是否匹配
    // 如果匹配，则获取用户输入的新密码，判断是否符合正则规范，如果符合，则获取新密码，实现密码的修改，如果不符合则给出提示
    // 如果原密码输入不正确，则给出提示
      let originPass = this.$refs.originPass.$refs.input.value;
      if (originPass === this.currentUser.password) {
      // 获取输入新的密码
        let newPass = this.$refs.newPass.$refs.input.value;
        if (/^\S{3,16}$/.test(newPass)) {
          let res = await updateUserById(this.currentUser.id, {
            password: newPass
          });
          if (res.data.message === '修改成功') {
          // 为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
            this.currentUser.password = newPass;
            this.$toast.success('修改成功')
          } else {
            this.$toast.feil('修改失败')
          }
        }
      }
    },
    // dialog关闭前的回调函数
    // action:confirm   cancel
    beforeClose(action, done) {
      console.log(action);
      // 判断原密码是否输入正确
      if (action === 'confirm') {
      // 输入原密码
        let originPass = this.$refs.originPass.$refs.input.value;
        // 获取原密码是否正确
        if (originPass === this.currentUser.password) {
        // 给出提示
          this.$toast.fail('原密码输入的不正确');
          // 阻止dialog的关闭
          this.$refs.originPass.$refs.input.select();
          this.$refs.originPass.$refs.input.focus();
          done(false);
        } else if (/^\{3,16}$/.test(this.$refs.newPass.$refs.input.value)) {
          this.$toast.fail('请输入3-16的新密码');
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    // 修改性别
    async updateGender() {
      let res = await updateUserById(this.currentUser.id, {
        gender: this.gender
      });
      if (res.data.message === '修改成功') {
      // 实现页面刷新效果
        this.currentUser.gender = this.gender;
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    },
    onChange(picker, value, index) {
      this.$toast(`当前值:${value},当前索引:${index}`);
      this.gender = index;
    },
    async getUserById() {
      let res = await getUserById(this.$route.params.id)
      console.log(res);
      if (res.data.message === '获取成功') {
        this.currentUser = res.data.data;
        // 如果有图片就拼接
        if (this.currentUser.header_img) {
          this.currentUser.header_img =
        'http//:127.0.0.1:3000' + this.currentUser.header_img;
        } else {
        // 如果没有图片就设置吗，默认的图片
          this.currentUser.header_img =
         'http://127.0.0.1:3000/uploads/images/default.png';
        }
      }
    }
  }

}
</script>
<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
