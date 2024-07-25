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
          ><view class="gachaImage"
            ><image class="gachaImagePanel" src="@/static/bookshelf/rewards/buchong.png"></image></view
          ><view class="daysNumber">2天</view></view
        >
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
    <view class="voucher"></view>
    <view class="performTasks"></view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.rewardsPage {
  min-height: 100vh; // 确保页面至少占满视口高度，但允许内容超过视口高度
  width: 100%; // 占满父容器的宽度
  display: flex;
  align-items: center;
  flex-direction: column; // 如果需要垂直排列子元素
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
  width: 90%;
  display: flex;
  flex-direction: column;
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
.voucher {
  height: 250rpx;
  width: 100%;
}
.performTasks {
  flex: 1;
  width: 100%;
  display: flex;
  background-color: yellow;
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
