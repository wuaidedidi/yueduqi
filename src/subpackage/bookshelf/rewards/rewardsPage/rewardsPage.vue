<template>
  <view class="rewardsPage">
    <view class="rewardsCenter">
      <image src="@/static/bookshelf/rewards/yuedu.png"></image>
    </view>

    <!--签到面板-->
    <view class="signInPanel">
      <view class="signTips">
        <view class="signLeft"><image src="@/static/bookshelf/rewards/touxiang.png"></image> </view>
        <view class="signRight">
          <view class="signWeekSet"
            ><view class="weekSpeak">本周已经断签天</view><view class="days">?</view>

            <view class="calendarNotifications">日历提醒<switch checked style="transform: scale(0.6)" /></view>
          </view>
          <view style="font-size: 20rpx; font-weight: lighter; opacity: 0.4">开通会员即可获得3次补签机会</view>
        </view>
      </view>

      <!--签到具体-->
      <view class="signGacha">
        <view class="gachaTips">签满另外得188代金券-连续签到</view>
        <view class="rowList"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/buchong.png"></image></view
          ><view class="daysNumber">1天</view></view
        >
        <view class="rowList"
          ><view class="score">+10</view
          ><view class="gachaImage">
            <image class="gachaImagePanel" src="@/static/bookshelf/rewards/buchong.png"></image>
          </view>
          <view class="daysNumber">2天</view>
        </view>
        <view class="rowList"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/dagou.png"></image></view
          ><view class="daysNumber">3天</view></view
        >
        <view class="rowList yellows"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/diyongquan.png"></image></view
          ><view class="daysNumber">4天</view></view
        >
        <view class="rowList yellows"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/diyongquan.png"></image></view
          ><view class="daysNumber">5天</view></view
        >
        <view class="rowList yellows"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/diyongquan.png"></image></view
          ><view class="daysNumber">6天</view></view
        >
        <view class="rowList yellows"
          ><view class="score">+10</view
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/diyongquan.png"></image></view
          ><view class="daysNumber">7天</view></view
        >
      </view>
    </view>
    <view class="voucher">
      <view class="voucherTop">
        <view class="toRead">去阅读</view>
        <view class="voucherTips"
          >阅读赚代金券<view class="checkRewards"
            ><view><image src="@/static/bookshelf/rewards/rewardBox.png"></image> </view>去抽奖></view
          ></view
        >
        <view class="voucherMiniTips">最高可得505代金券 </view>
      </view>
      <scroll-view class="voucherScroll" scroll-x enable-flex="true" :show-scrollbar="false" enhanced>
        <view class="voucherMain">
          <view class="voucherMainTop">
            <view class="voucherMainTopOne">+10代金券</view><view class="voucherMainTopOne">+15代金券</view
            ><view class="voucherMainTopOne">+22代金券</view><view class="voucherMainTopOne">+23代金券</view
            ><view class="voucherMainTopOne">+27代金券</view><view class="voucherMainTopOne">+28代金券</view>
          </view>
          <view class="voucherMainMiddle"><view class="horizontal-line"></view> </view>
          <view class="voucherMainBottom">
            <view class="voucherMainBottomText">2分钟可领</view>
            <view class="voucherMainBottomText">3分钟可领</view>
            <view class="voucherMainBottomText">4分钟可领</view>
            <view class="voucherMainBottomText">5分钟可领</view>
            <view class="voucherMainBottomText">6分钟可领</view>
            <view class="voucherMainBottomText">7分钟可领</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="performTasks">
      <view class="taskShow">
        <view class="taskTips">
          <view class="taskTipsTitle">做任务抽好礼<view class="taskTipsRight">我的收获&nbsp;></view></view>
          <view class="taskTipsCheckNumber">可翻牌次数1<view class="yiwen">?</view></view>
        </view>
        <view class="taskCheckImageList">
          <view class="taskCheckImage"><image src="@/static/bookshelf/rewards/fanpai.png" mode="scaleToFill" /></view>
          <view class="taskCheckImage"><image src="@/static/bookshelf/rewards/fanpai.png" mode="scaleToFill" /></view>
          <view class="taskCheckImage"><image src="@/static/bookshelf/rewards/fanpai.png" mode="scaleToFill" /></view>
          <view class="taskCheckImage"
            ><image src="@/static/bookshelf/rewards/fanpai.png" mode="scaleToFill"
          /></view> </view
      ></view>
    </view>

    <view class="taskList">
      <view class="taskOneTop">观看视频，送奖<view class="toCompleted" @tap="toCompletedOnClick">去完成</view></view>
      <view class="taskOneMiddle">剩余三次机会</view>
      <view class="taskOneBottom">+30经验+10活跃值</view>
    </view>
    <view class="horizontal"></view>
    <view class="taskList">
      <view class="taskOneTop"
        >到虎牙直播app领大奖<view class="toCompleted" @tap="toCompletedHuYaOnClick">去完成</view></view
      >
      <view class="taskOneMiddle">打开虎牙</view>
      <view class="taskOneBottom">+20代金券</view>
    </view>
    <view class="horizontal"></view>
    <view class="taskList">
      <view class="taskOneTop">分享今日日签<view class="toCompleted" @tap="toCompletedShareOnClick">去完成</view></view>
      <view class="taskOneMiddle">立得20代金券</view>
      <view class="taskOneBottom">+30经验+10活跃值</view>
    </view>
    <view class="horizontal"></view>
    <!-- Loading Modal -->
    <LoadingModal :visible="isModalVisible" @close="LoadingModalClose" />
  </view>
</template>

<script lang="ts" setup>
import LoadingModal from './components/LoadingModal.vue'
import { ref } from 'vue'

const isModalVisible = ref(false)
const toCompletedOnClick = () => {
  console.log('去完成')
}
const toCompletedHuYaOnClick = () => {
  // #ifdef APP-PLUS
  plus.runtime.launchApplication(
    {
      pname: 'com.duowan.kiwi',
      action: 'com.duowan.kiwi.action',
    },
    function (e) {
      console.log('启动失败: ' + JSON.stringify(e))
    },
  )
  // #endif

  // #ifdef MP-WEIXIN
  wx.navigateToMiniProgram({
    appId: 'wx74767bf0b684f7d3', // 替换为虎牙小程序的appId
    path: '', // 可选，目标小程序的页面路径
    extraData: {
      foo: 'bar',
    },
    envVersion: 'release',
    success(res) {
      console.log('打开小程序成功')
    },
  })
  // #endif

  // #ifdef MP-ALIPAY
  // my.navigateToMiniProgram({
  //   appId: "目标小程序的appId", // 替换为虎牙小程序的appId
  //   path: "", // 可选，目标小程序的页面路径
  //   extraData: {
  //     foo: "bar",
  //   },
  //   success: (res) => {
  //     console.log("打开小程序成功");
  //   },
  //   fail: (err) => {
  //     console.log("打开小程序失败", err);
  //   },
  // });
  // #endif
}

const toCompletedShareOnClick = () => {
  isModalVisible.value = true
  console.log(isModalVisible.value)
}

const LoadingModalClose = () => {
  isModalVisible.value = false
}
</script>

<style lang="scss" scoped>
.horizontal {
  width: 90%;
  background-color: #ece9e9;
  height: 1rpx;
}
.taskList {
  padding-top: 20rpx;
  display: flex;
  flex-direction: column;
  height: 200rpx;
  background-color: #f7f7f7;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.taskList .taskOneTop,
.taskOneMiddle,
.taskOneBottom {
  flex: 1;
  width: 90%;
}
.taskOneTop {
  font-weight: bolder;
  position: relative;
}
.toCompleted {
  position: absolute;
  right: 0;
  top: 0;
  height: 60rpx;
  width: 150rpx;
  color: #e05d56;

  background-color: #f3dede;
  border-radius: 20rpx;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taskOneMiddle {
  color: #ced0d4;
  font-size: 24rpx;
}
.taskOneBottom {
  color: #f6cf84;
  font-size: 24rpx;
}
.voucher {
  margin-top: 20rpx;
  height: 400rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
}
.voucherTop {
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 40rpx;
}
.toRead {
  background-color: #fcecec;
  color: #e5554e;
  position: absolute;
  right: 100rpx;
  top: 0;
  transform: translate(0%, 50%);
  font-size: 24rpx;
  font-weight: bolder;
  height: 60rpx;
  width: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50rpx;
}
.voucherTips {
  height: 50%;
  display: flex;
  flex: 1;
  width: auto;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-weight: bolder;
}
.checkRewards {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
  padding-top: 10rpx;
  padding-left: 40rpx;
  font-size: 24rpx;
  color: #febd1e;
  display: flex;
}

.checkRewards image {
  height: 35rpx;
  width: 35rpx;
}
.voucherMiniTips {
  width: auto;
  display: flex;
  flex: 1;
  font-size: 24rpx;
  color: #ccd0d2;
}
.voucherScroll {
  height: 100%;
  width: 100%;
  min-width: 90vw;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.voucherMainMiddle {
  flex: 1;
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
}
.voucherMainMiddle .horizontal-line {
  width: 100%; /* 设置线条宽度 */
  height: 1px; /* 设置线条高度 */
  background-color: #e6f0eb; /* 设置线条颜色 */
  margin: 10px 0; /* 设置上下间距 */
}
.voucherMain {
  height: 100%;
  min-width: 200%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.voucherMainTop {
  flex: 1;
  display: flex;
  // flex-wrap: wrap; // 允许子元素换行
  gap: 50rpx; // 子元素之间的间距
}
.voucherMainTopOne {
  flex: 1 0 25vw;
  display: flex;
  height: 70%;
  color: #fddd97;
  font-weight: bolder;
  font-size: 24rpx;
  border-radius: 20rpx;
  background-color: #fef6eb;
  justify-content: center;
  align-items: center;
}
.voucherMainBottom {
  flex: 1;
  display: flex;
  gap: 50rpx;
  border-bottom: 2rpx white solid;
}
.voucherMainBottomText {
  flex: 1 0 25vw;
  display: flex;
  height: 70%;
  color: #9d9fa4;
  font-weight: bolder;
  font-size: 24rpx;
  border-radius: 20rpx;
  justify-content: center;

  align-items: center;
}
.rewardsPage {
  min-height: 100vh; // 确保页面至少占满视口高度，但允许内容超过视口高度
  width: 100%; // 占满父容器的宽度
  display: flex;
  align-items: center;
  flex-direction: column; // 如果需要垂直排列子元素
  background-color: #ece9e9;
}
.rewardsCenter {
  height: 297rpx;
  width: 709rpx;
  border-radius: 22rpx;
}
.rewardsCenter image {
  height: 100%;
  width: 100%;
  border-radius: 22rpx;
}
.signInPanel {
  margin-top: 15rpx;
  height: 300rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 15rpx;
}
.calendarNotifications {
  font-size: 20rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translate(0%, -50%);
}
.signGacha {
  display: flex;
  width: 100%;
  flex: 1;
  position: relative;
  justify-content: space-around;
}
.gachaTips {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  transform: translate(0, -100%);
  background-color: #ff794c;
  border-radius: 20rpx;
  color: white;
  padding: 5rpx 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}
.signTips {
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
}
.signInPanel .signLeft {
  display: flex;
  width: 100rpx;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.signLeft image {
  width: 65%;
  height: 65%;
}
.signRight {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.performTasks {
  margin-top: 20rpx;
  width: 100%;
  min-height: 500rpx;
  background-color: #f7f7f7;
  border-radius: 10rpx;
}
.taskShow {
  height: 500rp;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.taskTips {
  margin-top: 30rpx;
  display: flex;
  height: 150rpx;
  width: 90%;
  flex-direction: column;
  justify-content: flex-start;
}
.taskTipsTitle {
  flex: 2;
  font-weight: bolder;
  font-size: 40rpx;
  position: relative;
}
.taskTipsRight {
  position: absolute;
  right: 30rpx;
  top: 5rpx;
  color: #abadb0;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taskTipsCheckNumber {
  flex: 3;
  color: #8e9198;
  opacity: 0.5;
  position: relative;
  align-self: flex-start;
}
.yiwen {
  position: absolute;
  right: -40rpx;
  top: 5rpx;
  height: 30rpx;
  width: 30rpx;
  border-radius: 50%;
  border: 2rpx solid #b6b6b6; /* 边框颜色和宽度 */
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taskCheckImageList {
  display: flex;
  height: 300rpx;
  width: 90%;
  gap: 10rpx;
}
.taskCheckImage image {
  height: 100%;
  width: 100%;
}
.taskCheckImage {
  flex: 1;
  height: 70%;
}
.weekSpeak {
  display: flex;
  width: auto;
}
.days {
  border: 4rpx solid lightgray;
  border-radius: 50%;
  font-size: 20rpx;
  margin-left: 20rpx;
  display: flex;
  width: 20rpx;
  height: 20rpx;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
}
.signWeekSet {
  font-weight: bolder;
  display: flex;
  position: relative;
  align-items: center;
}

.rowList {
  margin-left: 10rpx;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 10rpx;
}
.yellows {
  background-color: #fff8ee;
}
.score {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #bebebe;
  font-weight: bolder;
}
.gachaImage {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.gachaImagePanel {
  height: 90%;
  width: 60%;
}
.daysNumber {
  display: flex;
  flex: 1;
  font-size: 24rpx;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}
</style>
