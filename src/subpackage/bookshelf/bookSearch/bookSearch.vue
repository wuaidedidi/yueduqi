<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <button @click="goBack" class="back-button">＜</button>
      <image src="@/static/bookshelf/search/roboter.png" class="ai-icon" />
    </view>
    <!-- 搜索框和搜索按钮 -->
    <view class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="搜索书籍..." />
      <button @click="search" class="search-button">搜索</button>
    </view>
    <!-- 搜索记录和删除按钮 -->
    <view class="search-history">
      <view v-for="(item, index) in searchHistory" :key="index" class="history-item">
        {{ item }}
      </view>
      <button @click="clearHistory" class="clear-button">删除</button>
    </view>
    <!-- 滑动模块 -->
    <view class="books-section">
      <view class="book-category">
        <view class="category-title">男生</view>
        <scroll-view scroll-x="true" class="book-list">
          <view v-for="(book, index) in boysTopBooks" :key="index" class="book-item">
            {{ book }}
          </view>
        </scroll-view>
      </view>
      <view class="book-category">
        <view class="category-title">女生</view>
        <scroll-view scroll-x="true" class="book-list">
          <view v-for="(book, index) in girlsTopBooks" :key="index" class="book-item">
            {{ book }}
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchHistory = ref<string[]>([])
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
}

.ai-icon {
  width: 24px;
  height: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.search-history {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.history-item {
  margin-right: 8px;
}

.clear-button {
  margin-left: auto;
  padding: 4px 8px;
  background-color: #ff3b30;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.books-section {
  flex: 1;
}

.book-category {
  margin-bottom: 16px;
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
