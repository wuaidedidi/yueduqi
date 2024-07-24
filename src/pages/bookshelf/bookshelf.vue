<template>
  <view class="bookshelf-page">
    <!--侧边tips-->
    <view class="huadong" @tap="openHuaDongPanel" :animation="BoxAnimation">
      <view class="huadongImage">
        <image src="@/static/bookshelf/huadong1.png" @tap="onHuadongImageTap1"></image>
      </view>
      <view class="huadongImage"><image src="@/static/bookshelf/huadong2.png" @tap="onHuadongImageTap1"></image></view>
    </view>

    <!--促销区域-->
    <view class="cuxiao">
      <view class="cuxiaoClose">x</view>
      <image src="@/static/bookshelf/cuxiao.png" @tap="cuxiaoClick"></image>
    </view>

    <!-- 顶部导航栏 -->
    <view class="navbar">
      <text class="title">书架</text>
      <view class="right-buttons">
        <view class="search-btn-container">
          <view class="search-btn" @click="onSearch" style="padding-top: 10rpx; padding-right: 20rpx">
            <uni-icons type="search" size="25"></uni-icons>
          </view>
        </view>
        <view class="more-btn" ref="moreBtn" @click="toggleModal">⋯</view>
      </view>
    </view>

    <!-- 顶部功能区 -->
    <view class="top-section">
      <view class="left">
        <text class="small-text">本周读了 {{ readingMinutes }} 分钟</text>
        <view class="signin-btn" @click="onSignin">签到</view>
      </view>
      <view class="right">
        <view class="filter-btn" @click="onFilter">筛选</view>
        <view class="triangle"></view>
        <view class="separator">|</view>
        <view class="edit-btn" @click="onEdit">编辑</view>
      </view>
    </view>

    <!-- 中间书籍展示区 -->
    <scroll-view class="books-section" @scrolltolower="loadMoreBooks" scroll-y enable-flex>
      <view class="books-container">
        <view v-if="books.length >= 3" class="book-item">
          <swiper
            class="swiper"
            circular
            autoplay
            interval="3000"
            next-margin="30rpx"
            duration="500"
            easing-function="easeOutCubic"
            @change="swiperChange"
          >
            <swiper-item>
              <image src="@/static/bookshelf/lunbo/book1.jpg" class="book-cover"></image>
            </swiper-item>
            <swiper-item>
              <image src="@/static/bookshelf/lunbo/book2.jpg" class="book-cover"></image>
            </swiper-item>
            <swiper-item>
              <image src="@/static/bookshelf/lunbo/book3.jpg" class="book-cover"></image>
            </swiper-item>
          </swiper>
        </view>
        <view v-for="book in books" :key="book.id" class="book-item">
          <image :src="book.cover" class="book-cover"></image>
          <!-- <text class="book-title">{{ book.title }}</text> -->
        </view>
      </view>
    </scroll-view>

    <!-- 模态框 -->
    <view v-if="showModal" class="modal" @click="toggleModal">
      <view class="modal-content" @click.stop :style="modalStyle">
        <view @click="onLocalImport">本机导入</view>
        <view @click="onWlanTransfer">WLAN传书</view>
        <view @click="onMyBooks">我的书籍</view>
        <view @click="toggleModal">关闭</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ref, nextTick } from 'vue'

const showModal = ref(false)
const readingMinutes = ref(120)
const currentSlide = ref<number>(0)
/**是否展示滑动面板*/
const huadongPanelOpen = ref(false)
/**动画具体 */
const BoxAnimation = computed(() => {
  const animation = uni.createAnimation({
    duration: 500,
    timingFunction: 'ease',
    transformOrigin: 'center center',
  })
  if (huadongPanelOpen.value === true) {
    animation.scale(1.5, 2).step()
    // animation.scale(1, 1).step();
  } else {
    animation.scale(1, 1).step()
  }
  return animation.export()
})
const books = ref([
  { id: 1, title: '书籍1', cover: '/static/bookshelf/bookshelf.png' },
  { id: 2, title: '书籍2', cover: '/static/bookshelf/bookshelf.png' },
  { id: 3, title: '书籍3', cover: '/static/bookshelf/bookshelf.png' },
  { id: 4, title: '书籍4', cover: '/static/bookshelf/bookshelf.png' },
  { id: 5, title: '书籍5', cover: '/static/bookshelf/bookshelf.png' },
  { id: 6, title: '书籍6', cover: '/static/bookshelf/bookshelf.png' },
  { id: 7, title: '书籍7', cover: '/static/bookshelf/bookshelf.png' },
  { id: 8, title: '书籍8', cover: '/static/bookshelf/bookshelf.png' },
  { id: 9, title: '书籍9', cover: '/static/bookshelf/bookshelf.png' },
])

const onSearch = () => {
  console.log('搜索')
}

const onSignin = () => {
  console.log('签到')
}

const onFilter = () => {
  console.log('筛选')
}

const onEdit = () => {
  console.log('编辑')
}

const onLocalImport = () => {
  console.log('本机导入')
  showModal.value = false
}

const onWlanTransfer = () => {
  console.log('WLAN传书')
  showModal.value = false
}

const onMyBooks = () => {
  console.log('我的书籍')
  showModal.value = false
}

const toggleModal = () => {
  showModal.value = !showModal.value
  if (showModal.value) {
    nextTick(() => {
      const btn = moreBtn.value
      if (btn) {
        const rect = btn.getBoundingClientRect()
        modalStyle.value = {
          top: `${rect.bottom}px`,
          right: `${window.innerWidth - rect.right}px`,
        }
      }
    })
  }
}

const moreBtn = ref<HTMLElement | null>(null)
const modalStyle = ref({ top: '0px', right: '0px' })
const scrollTop = ref(0)
const scroll = () => {
  console.log(scroll)
}
const upper = () => {
  console.log(upper)
}
const lower = () => {
  console.log(lower)
}
const loadMoreBooks = () => {
  console.log('触发下拉')
  setTimeout(() => {
    const newBooks = [
      { id: 10, title: '书籍10', cover: '/static/bookshelf/bookshelf.png' },
      { id: 11, title: '书籍11', cover: '/static/bookshelf/bookshelf.png' },
      { id: 12, title: '书籍12', cover: '/static/bookshelf/bookshelf.png' },
    ]
    books.value = [...books.value, ...newBooks]
  }, 1000)
}

const swiperChange = ($event) => {
  const { current } = $event.detail
  currentSlide.value = current
}

/**
 * 启动滑动面板
 */
const openHuaDongPanel = () => {
  huadongPanelOpen.value = !huadongPanelOpen.value
  console.log('启动滑动面板')
}

const onHuadongImageTap1 = (event: Event) => {
  event.stopPropagation()
  console.log('滑动图片1点击')
}

const onHuadongImageTap2 = (event: Event) => {
  event.stopPropagation()
  console.log('滑动图片2点击')
}
const cuxiaoClick = () => {
  console.log('促销')
}
</script>

<style lang="scss" scoped>
.bookshelf-page {
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
  background-color: #f8f8f8;
}
.huadong {
  position: absolute;
  right: 0%;
  top: 38%;
  height: 130rpx;
  width: 50rpx;
  background-color: #ffffff;
  z-index: 1000;
  border-radius: 20rpx 0rpx 0rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.huadongImage {
  display: flex;
  width: 100%; /* 确保图像占满容器宽度 */
  height: 25%; /* 使图像自适应高度 */
  object-fit: cover; /* 使图像适应容器 */
  overflow: hidden; /* 确保图像放大时不会超出容器 */
}
.huadongImage image {
  height: 100%;
  width: 100%;
}
.cuxiao {
  position: absolute;
  right: 1%;
  bottom: 1%;
  height: 160rpx;
  width: 120rpx;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.cuxiao image {
  width: 100%;
  height: 100%;
}
.cuxiaoClose {
  z-index: 1200;
  right: 1%;
  top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 20rpx;
  width: 20rpx;
  font-size: 20rpx;
  opacity: 0.4;
  background-color: #9e9e9e;
}
.navbar {
  height: 60rpx;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #f8f8f8;
  align-items: center;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
}

.right-buttons {
  height: 60rpx;
  display: flex;
  align-items: center;
}

.separator {
  opacity: 0.1;
  margin: 10rpx 20rpx 20rpx 20rpx;
}

.search-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70rpx;
  height: 100%;
}

.search-btn,
.more-btn {
  border: none;
  background: none;
  font-size: 32rpx;
}

.top-section {
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  background-color: #ffffff;
  height: 60rpx;
}

.left {
  display: flex;
  height: 100%;
  align-items: center;
  background-color: #fef4f3;
  border-radius: 40rpx;
  padding: 0 15rpx;
}

.small-text {
  font-size: 24rpx;
}

.signin-btn {
  margin-left: 20rpx;
  background-color: #f46849;
  color: white;
  border: none;
  border-radius: 30rpx;
  padding: 2rpx 10rpx;
  font-size: 24rpx;
}

.right {
  display: flex;
  align-items: center;
}

.filter-btn,
.edit-btn {
  border: none;
  background: none;
  margin-left: 5rpx;
  font-size: 24rpx;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 10rpx solid black;
  margin-left: 5rpx;
  opacity: 0.1;
}

.books-section {
  height: calc(100vh - 240rpx);
  width: 100%;
  overflow-y: auto;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.book-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 290rpx;
  width: 28%;
  border-radius: 5rpx;
  margin-top: 60rpx;
  background-color: #f0f0f0;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5rpx;
  border-top-right-radius: 5rpx;
}

.book-title {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
}

.swiper {
  height: 100%;
  width: 100%;
  background-color: #f46849;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.modal-content {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  position: absolute;
}
</style>
