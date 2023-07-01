<template>
  <header flex bg-white p5 font-mono dark:bg-hex-2e2a2e shadow="">
    <h1 flex-1>
      <a href="/">Score Simulator</a>
    </h1>
    <div flex-1 text="5 right">
      <button pr-2 icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>
      <a
        i-carbon-logo-github icon-btn
        rel="noreferrer"
        href="https://github.com/tanzhijian/score-simulator"
        target="_blank"
        title="GitHub"
      />
    </div>
  </header>
  <main font-sans p="x-0 y-0" text="3 center">
    <RouterView />
    <TheFooter />
  </main>
</template>
