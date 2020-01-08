<template>
  <div class="editPersonal">
<hmheader title='编辑个人信息'>
        <span class="iconfont iconjiantou2" slot='left'  @click="$router.back()"></span>
</hmheader>
<div class="img">
<img :src="currentUser.header_img" alt/>
 <van-uploader :after-read="afterRead"/>
<hmcell title="昵称" :desc='currentUser.nickname' @click="nickshow=!nickshow"></hmcell>
 <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>
<hmcell title="密码" :desc='currentUser.password' type="password"></hmcell>
<hmcell title="性别" :desc='currentUser.gender===0?"女":"男"'></hmcell>
</div>
  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'
import { getUserById, updateUserById } from '@/apis/user.js'; // updateUserById
import { fileimg } from '@/apis/upload.js';
export default {
  components: {
    hmheader
  },
  data() {
    return {
      currentUser: {}
    }
  },
  async mounted() {
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
