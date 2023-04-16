<script setup lang='ts'>
import { ElButton, ElDialog } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store'
const authStore = useAuthStore()
const { agree } = storeToRefs(authStore)
</script>

<template>
  <ElDialog
    :model-value="!agree" title="免责声明（目前官网出现了正常调用key和代理都无法正常访问的bug，静待官方待修复，目前仅个人账号网页端受影响较小，建议购买账户）" width="80%" center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="dialog-con">
      该声明为使用本网站、服务或内容的用户提供免责声明。在使用本网站、服务或内容之前，请仔细阅读以下内容。<br>
      1.信息准确性<br>
      我们已经尽一切努力确保本网站上提供的信息和内容的准确性。然而，我们无法保证所有信息和内容都是完全准确、完整和最新的。因此，我们不承担因使用或依赖本网站、服务或内容而导致的任何损失或损害的责任。
      <br><br>
      2.第三方链接<br>
      我们的网站可能包含指向第三方网站或资源的链接。这些链接仅为方便用户提供，不代表我们对这些第三方网站或资源的认可、支持或保证。我们对这些第三方网站或资源的内容、隐私权政策、安全性或可靠性不承担任何责任。
      <br><br>
      3.知识产权<br>
      我们尊重他人的知识产权，也希望用户也同样尊重他人的知识产权。如果您认为我们的网站、服务或内容侵犯了您的知识产权，请联系我们。
      <br><br>
      4.使用风险<br>
      本网站、服务或内容的使用将完全由用户自行承担风险。我们不承担因使用或无法使用本网站、服务或内容而导致的任何损失或损害的责任。此外，我们不对用户在使用本网站、服务或内容时可能遭受的任何人身伤害、财产损失或其他任何形式的损害承担责任。
      <br><br>
      5.法律适用<br>
      本免责声明将受到适用法律的管辖。如果本免责声明的任何内容被视为违反适用法律，该内容将被视为已从本免责声明中删除，但不影响其余内容的有效性。
      <br><br>
      请注意，我们保留随时更改或修改本免责声明的权利，恕不另行通知。因此，请您定期查看本页面以了解任何更新。
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton type="success" size="large" @click="authStore.setAgree(true)">
          我知道了
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style scoped lang="less">
.dialog-con {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.dialog-footer {
  :deep(.el-button--success) {
    background-color: #8ac26e !important;
  }
}
</style>
