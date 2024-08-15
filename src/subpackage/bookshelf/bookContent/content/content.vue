<template>
  <view class="novel-container">
    <!-- 章节内容 -->
    <view
      class="chapter-content"
      :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'em' }"
      @click="toggleOverlay">
      <text>{{ visibleContent }}</text>
      <view class="audioContainer">
        <button @click="readText(visibleContent)" :disabled="isReading">
          {{ isReading ? '阅读中...' : '自动阅读' }}
        </button>
      </view>
    </view>

    <!-- 设置面板 -->
    <view v-show="showOverlay" class="settings-panel">
      <!-- 第一行：上一章、进度条、下一章 -->
      <view class="navigation-buttons">
        <view @click="prevChapter" :disabled="isFirstChapter">上一章</view>

        <view class="progress-box" ref="progressBox">
          <progress
            :percent="progress"
            stroke-width="10"
            show-info
            activeColor="#B6B6B6"
            border-radius="20rpx"
            font-size="24rpx"
            class="progress-panel" />
          <!-- 滑动圆圈 -->
          <view
            class="progress-circle"
            :style="{ left: progressCircleLeft + '%' }"
            @touchstart="onSliderStart"
            @touchmove="onSliderMove"
            @touchend="onSliderEnd"></view>
        </view>
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
          <view class="left-text">已完结 共{{ chapters.length }}章</view>
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
import { ref, computed, onMounted } from 'vue'
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
const progress = ref<number>(13)
const progressBox = ref<HTMLElement | null>(null)

const visibleContent = computed(() => {
  const start = currentPage.value * pageSize
  const end = start + pageSize
  return chapterContent.value.slice(start, end)
})
const progressCircleLeft = computed(() => progress.value) // 圆圈位置的百分比

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
/**
 * @description 加载章节
 * @param chapterId 章节id，就是区分章节的index
 * @param isSwitchChapter 是否是下一章节或者下一章节
 */
const loadChapter = async (chapterId: string, isSwitchChapter: boolean = false) => {
  currentChapter.value = chapterId
  currentPage.value = 0
  chapterContent.value = ''
  await loadPageContent()

  progress.value = Math.floor((Number(chapterId) * 100) / chapters.value.length)
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

const updateProgress = async (event: any) => {
  const gunDontWidth = 0.6 * 375 // 滚动条的总宽度为屏幕宽度的60%
  const pageX = event.changedTouches[0].pageX // 获取当前触摸点的 X 坐标

  // 计算滑块在滚动条中的位置，确保进度值在 0 到 1 之间
  let progressValue = (pageX - 75) / gunDontWidth

  // 限制 progressValue 的值范围在 0 到 1 之间
  if (progressValue < 0) progressValue = 0
  if (progressValue > 1) progressValue = 1
  const currentIndex = Math.floor(parseFloat(progressValue.toFixed(2)) * chapters.value.length)
  if (currentIndex > 0) {
    await loadChapter(chapters.value[currentIndex - 1].id, true)
  }
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
// 圆圈拖动开始事件
const onSliderStart = (event: any) => {
  event.preventDefault()
}

// 假设设计稿宽度是 750px
const designWidth = 750

// 获取设备信息
const systemInfo = uni.getSystemInfoSync()
const screenWidth = systemInfo.windowWidth // 当前设备屏幕宽度，单位是 px

// 转换 pageX 为 rpx
const convertPageXToRpx = (pageX: number) => {
  // 计算实际设备宽度与设计稿宽度的比例
  const rpx = (pageX / screenWidth) * designWidth
  return rpx
}
/**
 *@description 节流函数
 * @param func
 * @param limit
 */
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const onSliderMove = throttle((event: any) => {
  const gunDontWidth = 0.6 * 375 // 滚动条的总宽度为屏幕宽度的60%
  const pageX = event.touches[0].pageX // 获取当前触摸点的 X 坐标

  // 计算滑块在滚动条中的位置，确保进度值在 0 到 1 之间
  let progressValue = (pageX - 75) / gunDontWidth

  // 限制 progressValue 的值范围在 0 到 1 之间
  if (progressValue < 0) progressValue = 0
  if (progressValue > 1) progressValue = 1

  // 更新进度条的数值
  progress.value = Math.round(progressValue * 100)

  // 与上面代码相同
}, 16)

// 圆圈拖动结束事件
const onSliderEnd = async (event: any) => {
  await updateProgress(event) // 更新进度
}

// API keys and URLs
const apiKey = '73BYmtbKEpomR7ZrYKR28hZE'
const secretKey = 'OkIPEGfWylgazr2mWhYp63kbk4bqLKiq'
const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
const synthesizeUrl = 'https://tsn.baidu.com/text2audio'
// Reactive variables
const accessToken = ref<string>('')
const isReading = ref<boolean>(false)

interface AccessTokenResponse {
  access_token: string
  expires_in: number
  scope: string
}

// Get access_token
const getAccessToken = async () => {
  try {
    const response = await uni.request({
      url: tokenUrl,
      method: 'POST',
    })

    const data = response.data as AccessTokenResponse

    if (response.statusCode === 200 && data.access_token) {
      accessToken.value = data.access_token
    } else {
      uni.showToast({
        title: '获取token失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '请求失败',
      icon: 'none',
    })
  }
}
// Function to generate and play speech
const readText = async (text: string) => {
  if (!accessToken.value) {
    await getAccessToken()
  }

  if (accessToken.value) {
    const params = {
      // tex: encodeURIComponent("text"), // 文本内容需要 URL 编码
      tex: '大白猪住没有奶糖',
      tok: accessToken.value, // Access Token
      cuid: 'EOiMC0nwESApj7tRXkfslCAPtcyhtVCq', // 用户标识符
      ctp: 1, // 客户端类型，1 表示 Web
      lan: 'zh', // 语言，zh 表示中文
      spd: 5, // 语速，取值0-15，默认为5中语速
      pit: 5, // 音调，取值0-15，默认为5中音调
      vol: 5, // 音量，取值0-15，默认为5中音量
      per: 0, // 发音人选择，0为女声，1为男声，3为度逍遥，4为度丫丫
    }

    try {
      const response = await uni.request({
        url: synthesizeUrl,
        method: 'POST',
        data: params, // 将参数放到请求体中
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', // 确保 Content-Type 为正确类型
        },
        responseType: 'arraybuffer', // 指定响应数据类型为 arraybuffer
      })

      if (response.statusCode === 200 && response.data) {
        const arrayBufferData = response.data as ArrayBuffer
        // 将 ArrayBuffer 转换为 Base64
        const base64String = uni.arrayBufferToBase64(arrayBufferData)
        // 为 Base64 数据添加音频 MIME 类型前缀
        const base64Audio = `data:audio/mp3;base64,${base64String}`

        console.log(accessToken.value)
        // 创建音频对象
        const audio = uni.createInnerAudioContext()
        audio.src = base64Audio // 使用 Base64 字符串作为音频源
        audio.autoplay = true
        audio.play()

        audio.onPlay(() => {
          console.log('播放中')
          isReading.value = true
        })
        audio.onEnded(() => {
          isReading.value = false
        })
      } else {
        uni.showToast({
          title: '语音合成失败',
          icon: 'none',
        })
      }
    } catch (error) {
      uni.showToast({
        title: '请求失败',
        icon: 'none',
      })
    }
  }
}
// Initialize
onMounted(() => {
  getAccessToken()
})
</script>

<style scoped lang="scss">
.audioContainer {
  position: absolute;
  left: 0;
  top: 0;
  height: 200rpx;
  width: 200rpx;
  button {
    padding: 10px 20px;
    background-color: #007aff;
    color: white;
    border-radius: 5px;
  }
}

.progress-box {
  position: relative;
  display: flex;
  height: 50rpx;
  width: 450rpx;
  align-items: center;
}
.progress-circle {
  position: absolute;
  top: 5rpx; /* 调整圆圈的位置 */
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #fff;
  transform: translateX(-50%);
  touch-action: none;
}
.novel-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}

.chapter-content {
  position: relative;
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

.progress-panel {
  width: 100%;
}
</style>
