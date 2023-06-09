<script setup lang="ts">

</script>

<template>
  <div ml-2 mr-2 rd-4 bg-white pb-5 pt-5 dark:bg-hex-121212>
    <!-- 比赛 -->
    <div flex items-center justify-center pb-5>
      <div pr-2>
        <img w-8 src="https://crests.football-data.org/CL.png">
      </div>
      <div text="5">
        Champions League Final
      </div>
    </div>
    <!-- 队伍信息和比分 -->
    <div flex>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 src="https://crests.football-data.org/65.png">
        </div>
        <div>
          Man City
        </div>
      </div>
      <div flex-1>
        <div text="10">
          0 - 0
        </div>
        <div text="5 gray">
          45
        </div>
      </div>
      <div flex-1>
        <div flex items-center justify-center>
          <img w-12 src="https://crests.football-data.org/108.png">
        </div>
        <div>
          Inter
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div flex="~ gap1" justify-center pt-5>
      <button text="10" i-carbon-play-filled mr-8 bg-green-600 />
      <button text="10" i-carbon-renew ml-8 bg-green-600 />
    </div>
    <!-- 模拟内容 -->
    <div p5 text="left gray" flex="~ gap1">
      <div i-carbon-circle-dash />
      <div i-carbon-circle-filled />
    </div>
  </div>
</template>
