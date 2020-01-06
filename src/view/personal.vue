<template>
<div class="personal">
    <router-link :to="{path:`/personal/${currentUser.id}`}">
    <div class="profile">
        <img :src="currentUser.head_img" alt />
        <div class="profile-centen">
            <div class="name">
                <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
            </div>
             <div class="time">{{currentUser.create_date | dateFormat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
    </div>
    </router-link>
    <hmcell title="我的关注" deasc="关注的用户"></hmcell>
    <hmcell title="我的跟帖" deasc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" deasc="文章/视频"></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbutton class="btn" @click="exit">退出</hmbutton>
</div>
</template>

<script>
import hmcell from '@/components/hmcell.vue'
import hmbutton from '@/components/hmbutton.vue'
import { getUserById } from '@/apis/user.js'
import { dateFormat } from '@/utils/filters.js'
export default {
  components: {
    hmcell, hmbutton
  },
  filters: {
    dateFormat
  },
  user: {
    getUserById
  },
  data() {
    return {
      // 当前用户登录对象
      currentUser: {

      }
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.btn {
  margin:  20px auto;
  background-color: #f00;
}
</style>
