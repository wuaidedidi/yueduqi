<template>
  <view class="bookstore">
    <!-- 菜单栏 -->
    <view class="menu">
      <scroll-view class="menu-scroll" scroll-x :show-scrollbar="false">
        <view class="menu-items">
          <view v-for="item in menuItems" :key="item" class="menu-item" :class="{ active: item === '精选' }">
            {{ item }}
          </view>
        </view>
      </scroll-view>
      <view class="icons">
        <view class="icon-classify"></view>
        <view class="icon-search"></view>
      </view>
    </view>

    <!-- Banner -->
    <swiper class="banner" autoplay interval="3000" circular>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <image :src="item.src" class="banner-image"></image>
      </swiper-item>
    </swiper>

    <!-- 今日推荐 -->
    <view class="recommend">
      <view class="recommend-header">
        <text class="recommend-title">今日推荐</text>
        <navigator url="/pages/more/more" class="recommend-more">查看更多</navigator>
      </view>
      <view class="book-list">
        <view class="book-item" v-for="(book, index) in recommendedBooks" :key="index">
          <image :src="book.cover" class="book-cover"></image>
          <text class="book-title">{{ book.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 菜单项
const menuItems = ref(['精选', '男生', '女生', '出版', 'Ai语音', '免费', '听书', '漫画'])

// Banner 图片
const banners = ref([
  { src: '/static/bookstore/banner/banner1.jpg' },
  { src: '/static/bookstore/banner/banner2.jpg' },
  { src: '/static/bookstore/banner/banner3.jpg' },
])

// 今日推荐书籍
const recommendedBooks = ref([
  { cover: '/static/bookstore/books/book1.png', title: '书籍1' },
  { cover: '/static/bookstore/books/book2.png', title: '书籍2' },
  { cover: '/static/bookstore/books/book3.png', title: '书籍3' },
  { cover: '/static/bookstore/books/book4.png', title: '书籍4' },
  { cover: '/static/bookstore/books/book1.png', title: '书籍5' },
  { cover: '/static/bookstore/books/book2.png', title: '书籍6' },
  { cover: '/static/bookstore/books/book3.png', title: '书籍7' },
  { cover: '/static/bookstore/books/book4.png', title: '书籍8' },
])
</script>

<style lang="scss" scoped>
.bookstore {
  display: flex;
  flex-direction: column;
}

/* 菜单栏样式 */
.menu {
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  width: 100%;
}

.menu-scroll {
  height: 100%;
  flex: 1; /* 确保 scroll-view 可以占用剩余空间 */
  overflow-x: auto; /* 显示水平滚动条 */
}

.menu-items {
  display: flex;
  width: max-content; /* 让内容宽度超出 scroll-view 宽度 */
  align-items: center; /* 确保菜单项垂直对齐 */
}

.menu-item {
  flex: 0 0 100rpx; /* 确保每个菜单项的宽度 */
  margin: 0 10rpx;

  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item.active {
  font-size: 18px;
  font-weight: bold;
}

.icons {
  height: 100%; /* 使图标区域占据整个高度 */
  display: flex;
}

.icon-classify,
.icon-search {
  width: 24px;
  height: 24px;
  background-color: #ddd; /* 示例颜色 */
  margin-left: 10px;
}

/* Banner 样式 */
.banner {
  height: 150px;
  width: 90%;
  margin: 0 auto;
  border-radius: 20rpx;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}

/* 今日推荐样式 */
.recommend {
  padding: 10px;
  background-color: #fff;
}

.recommend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.recommend-title {
  font-size: 18px;
  font-weight: bold;
}

.recommend-more {
  font-size: 14px;
  color: #007aff;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
}

.book-item {
  width: 25%;
  padding: 10px;
}

.book-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.book-title {
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
}
</style>
