<template>
  <view class="novel-container">
    <!-- 章节内容 -->
    <view
      class="chapter-content"
      :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'em' }"
      @click="toggleOverlay">
      <text>{{ visibleContent }}</text>
    </view>

    <!-- 设置面板 -->
    <view v-show="showOverlay" class="settings-panel">
      <!-- 第一行：上一章、进度条、下一章 -->
      <view class="navigation-buttons">
        <view @click="prevChapter" :disabled="isFirstChapter">上一章</view>
        <input type="range" v-model="progress" @input="updateProgress" />
        <view @click="nextChapter" :disabled="isLastChapter">下一章</view>
      </view>
      <!-- 第二行：目录、亮度、夜间、设置 -->
      <view class="settings-buttons">
        <view @click="toggleDirectory"><image src="@/static/bookcontent/icon/mulu.png"></image>目录</view>
        <view><image src="@/static/bookcontent/icon/liangdu_o.png"></image>亮度</view>
        <view><image src="@/static/bookcontent/icon/yejian.png"></image>夜间</view>
        <view @click="toggleSettings"><image src="@/static/bookcontent/icon/shezhi.png"></image>设置</view>
      </view>
      <view v-if="showSettings" class="settings-options">
        <label>
          字体大小:
          <input type="number" v-model="fontSize" />
        </label>
        <label>
          行间距:
          <input type="number" v-model="lineHeight" />
        </label>
      </view>

      <!-- 目录面板 -->
      <view
        class="chapter-list"
        v-show="showDirectory"
        :class="{ 'slide-in': showDirectory, 'slide-out': !showDirectory }">
        <view class="TitleText bolder textCenter"> 夜不语诡秘档案(实体封面101-603)作者...> </view>

        <view class="checkTag">
          <view
            v-for="(item, index) in checkTagItems"
            :key="index"
            @click="() => (activeTagIndex = index)"
            :class="['checkTagItem', { activeTagItem: activeTagIndex === index }]">
            {{ item }}
          </view>
        </view>
        <view class="bookInfo">
          <view class="left-text">已完结 共552章</view>
          <view class="right-text">正序</view>
        </view>

        <scroll-view scroll-y :scrollTop="scrollTop">
          <view class="chapter-list-one" v-for="chapter in chapters" :key="chapter.id" @click="loadChapter(chapter.id)">
            {{ chapter.title }}
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getChaptersAPI, getChapterContentAPI } from '@/api/book'
import { onLoad } from '@dcloudio/uni-app'

const chapters = ref<{ id: string; title: string }[]>([])
const chapterContent = ref<string>('')
const currentPage = ref<number>(0)
const currentChapter = ref<string>('')
const pageSize = 2000 // 每次加载的字符数
const isLastPage = ref<boolean>(false)
const fontSize = ref<number>(16)
const lineHeight = ref<number>(1.5)
const showSettings = ref<boolean>(false)
const showOverlay = ref<boolean>(false)
const showDirectory = ref<boolean>(false)
const scrollTop = ref<number>(0)
const progress = ref<number>(0)

const visibleContent = computed(() => {
  const start = currentPage.value * pageSize
  const end = start + pageSize
  return chapterContent.value.slice(start, end)
})

const isFirstChapter = computed(() => currentChapter.value === chapters.value[0]?.id)
const isLastChapter = computed(() => currentChapter.value === chapters.value[chapters.value.length - 1]?.id)

const loadInitialChapter = async () => {
  try {
    const response = await getChaptersAPI()

    if (response.status === 200) {
      chapters.value = response.data
      if (chapters.value.length > 0) {
        currentChapter.value = chapters.value[0].id
        await loadPageContent()
      }
    } else {
      uni.showToast({
        icon: 'none',
        title: response.message || '请求失败',
      })
    }
  } catch (error) {
    uni.showToast({
      icon: 'none',
      title: '网络错误，无法获取章节列表',
    })
  }
}

const loadChapter = async (chapterId: string, isSwitchChapter: boolean = false) => {
  currentChapter.value = chapterId
  currentPage.value = 0
  chapterContent.value = ''
  await loadPageContent()
  if (!isSwitchChapter) {
    showOverlay.value = false
  }
  showDirectory.value = false
}

const loadPageContent = async () => {
  try {
    const response = await getChapterContentAPI(
      '学霸的黑科技系统.txt', // 替换成你的文件名
      currentChapter.value,
      currentPage.value,
      pageSize,
    )
    if (response.status === 200) {
      chapterContent.value = response.data
      isLastPage.value = response.data.length < pageSize
    } else {
      uni.showToast({
        icon: 'none',
        title: response.message || '请求失败',
      })
    }
  } catch (error) {
    uni.showToast({
      icon: 'none',
      title: '网络错误，无法获取章节内容',
    })
  }
}

const prevChapter = async () => {
  const currentIndex = chapters.value.findIndex((chapter) => chapter.id === currentChapter.value)
  if (currentIndex > 0) {
    await loadChapter(chapters.value[currentIndex - 1].id, true)
  }
}

const nextChapter = async () => {
  const currentIndex = chapters.value.findIndex((chapter) => chapter.id === currentChapter.value)
  if (currentIndex < chapters.value.length - 1) {
    await loadChapter(chapters.value[currentIndex + 1].id, true)
  }
}

const prevPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1
    await loadPageContent()
  }
}

const nextPage = async () => {
  if (!isLastPage.value) {
    currentPage.value += 1
    await loadPageContent()
  }
}

const updateProgress = async () => {
  currentPage.value = Math.floor((progress.value * chapterContent.value.length) / pageSize)
  await loadPageContent()
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
  showDirectory.value = false
}

const toggleOverlay = () => {
  showOverlay.value = !showOverlay.value
  showSettings.value = false
  showDirectory.value = false
}

const toggleDirectory = () => {
  showDirectory.value = !showDirectory.value
  if (showDirectory.value === false) scrollTop.value = 0
  showSettings.value = false
}

onLoad(() => {
  loadInitialChapter()
})

enum tagType {
  Catalog = 0,
  Note = 1,
  Bookmark = 2,
}
const checkTagItems = ['目录', '笔记', '书签']
const activeTagIndex = ref<tagType>(0)
</script>

<style scoped lang="scss">
.novel-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}

.chapter-content {
  flex: 1;
  padding: 16px;
  background-color: #f2e7d0;
}

.settings-panel {
  position: fixed; /* 使用 fixed 确保始终在视口内 */
  bottom: 0;
  left: 0;
  height: 200rpx;
  right: 0;
  background-color: #f2e6ce;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 3000; /* 确保在最上层 */
}

.navigation-buttons,
.settings-buttons {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

.settings-buttons {
  view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;

    image {
      height: 40rpx;
      width: 40rpx;
    }
  }
}

.settings-options {
  padding: 16px;
}

.chapter-list {
  position: fixed; /* 使用 fixed 定位确保不会被遮挡 */
  bottom: 200rpx;
  left: 0;
  right: 0;
  background-color: #f3e7cf;
  border-radius: 20rpx;
  height: 80vh;
  overflow-y: scroll;
  z-index: 2000; /* 确保在 settings-panel 下层 */
  color: #534f4c;
}

.chapter-list-one {
  height: 100rpx;
  display: flex;
  justify-content: flex-start;
  padding-left: 50rpx;
  font-weight: bolder;
  color: #534f4c;
  align-items: center;
  border-top: 0.5rpx solid rgba(201, 199, 194, 0.5); /* 设置颜色为半透明 */
}

/* 示例 */
@keyframes slide-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.slide-in {
  animation: slide-in 0.5s ease-in-out;
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

.slide-out {
  animation: slide-out 0.5s ease-in-out;
}

.TitleText {
  font-size: 35rpx;
  color: #211e19;
  height: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bolder {
  font-weight: bolder;
}

.textCenter {
  text-align: center;
}

.bookInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 24rpx;
  font-weight: bolder;
  opacity: 0.6;
}

.checkTag {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  height: 70rpx;
  border-radius: 50rpx;
  background-color: #e7dbc3;
}

.checkTagItem {
  flex: 1;
  height: 100%;
  border-radius: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.activeTagItem {
  background-color: #534d41;
  color: #efe3cc;
}
</style>
