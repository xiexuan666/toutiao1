<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 标签页 -->
    <div class="nav">
      <!-- 整个标签页 -->
      <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
      <van-tabs v-model="active" sticky swipeable>
        <!-- 单击标签项及内容面板 -->
        <!-- 生成栏目数据 -->
        <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
          <!-- 生成当前栏目的文章列表数据 -->
          <hmarticleblock
            v-for="item in cate.postList"
            :key="item.id"
            :post="item"
          ></hmarticleblock>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 新闻列表 -->
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getCateList } from '@/apis/cate.js';
import { getPostList } from '@/apis/article.js';
import hmarticleblock from '@/components/hmarticleBlock.vue';
export default {
  methods: {
    async init() {
      let id = this.cateList[this.active].id;
      let res2 = await getPostList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: id
      });
      // 将数据存储到当前栏目的postList中
      this.cateList[this.active].postList = res2.data.data;
    }
  },
  data() {
    return {
      id: '',
      // 我们应该始终让头条被激活。如果登陆过，栏目数据中返回了关注，那么应该将active设置为1，否则设置为0
      active: localStorage.getItem('token') ? 1 : 0,
      cateList: []
    };
  },
  watch: {
    active() {
      // eslint-disable-next-line no-console
      console.log(this.active);
      // 重新发起请求，获取当前栏目的新闻数据
      // 注意：如果之前已经加载好数据了，那么就不用再重复的加载
      if (this.cateList[this.active].postList.length === 0) {
        this.init();
      }
    }
  },
  components: {
    hmarticleblock
  },
  async mounted() {
    // 获取用户id
    this.id = JSON.parse(localStorage.getItem('user') || '{}').id;

    // 获取所有栏目数据
    let res = await getCateList();
    this.cateList = res.data.data;
    // eslint-disable-next-line no-console
    console.log(res);
    // 重点操作：对数据进行改造
    this.cateList = this.cateList.map(value => {
      return {
        ...value, // 展开对象，我要这个对象的所有成员
        postList: [], // 这个栏目的新闻列表数据
        pageSize: 20, // 这个栏目每页所显示的记录数
        pageIndex: 1 // 这个栏目 当前的页码
      };
    });
    // eslint-disable-next-line no-console
    console.log(this.cateList);
    // 获取默认栏目的新闻数据，并动态渲染
    // this.cateList[this.active]:就是当前的默认栏目
    this.init();
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
    .iconnew {
      font-size: 60px;
    }
  }
  .search {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    line-height: 40px;
  }
  .user {
    font-size: 25px;
    padding: 0 10px;
  }
}
</style>
