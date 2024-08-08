<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view @click="goBack" class="back-button">＜</view>
      <image src="@/static/bookshelf/search/roboter.png" class="ai-icon" />
      <view class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="搜索书籍..." />
        <view @click="search" class="search-button">搜索</view>
      </view>
    </view>
    <!-- 搜索记录和删除按钮 -->
    <view class="search-history">
      <view class="searchHistoryStyle">搜索记录</view>
      <view @click="clearHistory" class="clear-button">删除</view>
    </view>
    <view scroll-x="true" class="history-container">
      <view v-for="(item, index) in searchHistory" :key="index" class="history-item">
        {{ item }}
      </view>
    </view>
    <!-- 滑动模块 -->
    <scroll-view scroll-x="true" class="books-section">
      <view class="book-category">
        <view class="category-title">男生</view>
        <view class="book-list">
          <view v-for="(book, index) in boysTopBooks" :key="index" class="book-item">
            {{ book }}
          </view>
        </view>
      </view>
      <view class="book-category">
        <view class="category-title">女生</view>
        <view class="book-list">
          <view v-for="(book, index) in girlsTopBooks" :key="index" class="book-item">
            {{ book }}
          </view>
        </view>
      </view>
      <view class="book-category">
        <view class="category-title">热门</view>
        <view class="book-list">
          <view v-for="(book, index) in hotBooks" :key="index" class="book-item">
            {{ book }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchHistory = ref<string[]>(['斗罗大陆', '庆余年', '全职高手', '诛仙'])
const boysTopBooks = ref<string[]>([
  '书籍1',
  '书籍2',
  '书籍3',
  '书籍4',
  '书籍5',
  '书籍6',
  '书籍7',
  '书籍8',
  '书籍9',
  '书籍10',
])
const girlsTopBooks = ref<string[]>([
  '书籍A',
  '书籍B',
  '书籍C',
  '书籍D',
  '书籍E',
  '书籍F',
  '书籍G',
  '书籍H',
  '书籍I',
  '书籍J',
])
const hotBooks = ref<string[]>([
  '书籍X',
  '书籍Y',
  '书籍Z',
  '书籍W',
  '书籍V',
  '书籍U',
  '书籍T',
  '书籍S',
  '书籍R',
  '书籍Q',
])

const goBack = () => {
  uni.navigateBack()
}

const search = () => {
  if (searchQuery.value) {
    searchHistory.value.push(searchQuery.value)
    // 执行搜索逻辑
  }
}

const clearHistory = () => {
  searchHistory.value = []
}
</script>

<style scoped>
.searchHistoryStyle {
  font-weight: bold;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.header {
  display: flex;
  align-items: center;
}

.back-button {
  font-size: 24px;
  margin-right: 8px;
  cursor: pointer;
}

.ai-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.search-bar {
  display: flex;
  align-items: center;
  flex: 1;
}

.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  margin-left: 8px;
  padding: 8px 12px;
  background-color: #007aff;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.search-history {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.history-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  height: 70rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.history-item {
  display: flex;
  flex: 1;
  height: 100%;

  color: #888;
  font-size: 12px;
  white-space: nowrap;
}

.clear-button {
  margin-left: auto;
  padding: 4px 8px;
  font-size: 24rpx;
  font-weight: bolder;
  opacity: 0.4;
  text-align: center;
  cursor: pointer;
}

.books-section {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}

.book-category {
  min-width: 80%;
  margin-right: 16px;
}

.category-title {
  font-size: 18px;
  margin-bottom: 8px;
}

.book-list {
  display: flex;
  overflow-x: auto;
}

.book-item {
  flex: none;
  width: 100px;
  margin-right: 8px;
  text-align: center;
}
</style>
