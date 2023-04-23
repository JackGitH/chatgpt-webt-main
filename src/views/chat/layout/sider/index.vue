<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function goBuy() {
  alert("快来了，稍等")
  //const buyUrl = 'https://aidoge.info/static/a.html' + `?${Date.now()}`
  //window.location.href = buyUrl
}
function goHome() {
  const homeUrl = 'https://aidoge.info/' + `?${Date.now()}`
  window.location.href = homeUrl
}
function doPay() {
  alert("5天后即将开放付费入口，目前完全免费")
  //const wechatUrl = 'https://aidoge.info/key/#/' + `?${Date.now()}`
  //window.location.href = wechatUrl
}

function doKey() {
  const wechatUrl = 'https://aidoge.info/key/#/' + `?${Date.now()}`
  window.location.href = wechatUrl
}
function getUrl() {
  const wechatUrl = 'https://ghc-buc-1-1302315235.cos.ap-beijing.myqcloud.com/WechatIMG359.jpeg' + `?${Date.now()}`
  window.location.href = wechatUrl
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed"
    :collapsed-width="0"
    :width="260"
    :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform"
    position="absolute"
    bordered
    :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton dashed block @click="handleAdd">
            {{ $t('chat.newChatButton') }}
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div class="p-4">


          <NButton block  @click="goHome">
            <a>返回官网主页</a>
          </NButton>
          <NButton block @click="doPay">
            <a >充值</a>
          </NButton>
          <NButton block @click="doKey">
            <a >点击使用key访问chatgpt</a>
          </NButton>
          <NButton block @click="getUrl">
            <a >加入社群（wechat）</a>
          </NButton>
          <NButton block @click="show = true">
            {{ $t('store.siderButton') }}
          </NButton>
        </div>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
</template>
