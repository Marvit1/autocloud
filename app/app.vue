<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useSeoMeta, useRuntimeConfig } from "#imports"

const { t, locale } = useI18n()
const config = useRuntimeConfig()

const defaultOgImage = `${config.public.baseUrl}/images/logs.jpg`

const title = computed(() => 'AutoSwift - ավտոմեքենաների խանութ')
const description = computed(() => 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
  ogSiteName: 'AutoSwift',
  ogUrl: () => config.public.baseUrl,
  ogLocale: () => locale.value === 'hy' ? 'hy_AM' : locale.value === 'ru' ? 'ru_RU' : 'en_US',
  ogImage: defaultOgImage,
  ogImageSecureUrl: defaultOgImage,
  ogImageWidth: '1024',
  ogImageHeight: '765',
  ogImageAlt: 'AutoSwift Logo',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: defaultOgImage,
  twitterImageAlt: 'AutoSwift Logo'
})
</script>

<template> 
  <div> 
    <NuxtRouteAnnouncer /> 
    <NuxtLayout> 
      <NuxtPage /> 
    </NuxtLayout> 
  </div> 
</template>

<style scoped>
.logo-section img,
[src*="dd.jfif"] {
  border-radius: 12px;
  object-fit: cover;
}
</style>

<!-- ✅ Սա ճիշտ ա Vue 3-ում -->
<style>
html, body {
  margin: 0;
  padding: 0;
  background: transparent;
}
</style>