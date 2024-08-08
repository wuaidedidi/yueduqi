<template>
  <view v-if="visible" class="modal" @click="handleClick">
    <view class="modal-content" @click.stop>
      <view class="loader"></view>
      <text class="loading-text">正在生成图片...</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

// 定义 props
const props = defineProps<{
  visible: boolean
}>()

// 定义 emits
const emit = defineEmits<{
  (e: 'close'): void
}>()

// 处理点击事件
const handleClick = () => {
  emit('close')
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: white;
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loader {
  width: 50rpx;
  height: 50rpx;
  border: 5rpx solid rgba(255, 0, 0, 0.2);
  border-top-color: red;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-text {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: red;
}
</style>
