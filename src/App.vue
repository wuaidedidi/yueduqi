<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style style lang="scss">
/* 全局样式 */

page {
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
  // 取消滚动条
  .cancel-scrollbar {
    height: 100%;
    overflow: auto;
  }
  .cancel-scrollbar::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
