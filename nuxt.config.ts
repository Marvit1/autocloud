// nuxt.config.ts
declare const process: {
  env: { [key: string]: string | undefined }
}

const baseUrl = process.env.BASE_URL || 'https://www.autoswift.shop'
const defaultOgImage = `${baseUrl}/images/logs.jpg`

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // ✅ SSR ՄԻԱՑՆԵԼ (Կարևոր է SEO-ի և սոցցանցերի համար)
  ssr: true,

  alias: {
    '~': './app',
    '@': './app'
  },

  modules: [
    '@nuxtjs/i18n'
  ],

  // ✅ Կայքի հիմնական տվյալները
  runtimeConfig: {
    public: {
      baseUrl,
      apiBase: process.env.API_BASE_URL || 'https://api.autoswift.shop',
      siteName: 'AutoSwift',
    }
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: ['/', '/en', '/ru'],
      crawlLinks: true 
    },
    compressPublicAssets: true,
    minify: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'hy'
      },
      title: 'AutoSwift - ավտոմեքենաների խանութ',
      titleTemplate: '%s · AutoSwift',
      
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // Ստանդարտ favicon
        { rel: 'apple-touch-icon', href: '/aa.jpg' }, // iOS-ի համար
        { rel: 'canonical', href: baseUrl },
        { rel: 'preconnect', href: 'https://api.autoswift.shop' }
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#667eea' },
        { name: 'description', content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։' },
        { name: 'keywords', content: 'ավտոմեքենա, մեքենա գնել, ավտոմեծ, վաճառք, Հայաստան' },

        // Global fallback OG/Twitter metadata is managed dynamically in app.vue to prevent duplicates.

        // ✅ SEO & Robots
        { name: 'robots', content: 'index, follow' },
        { name: 'revisit-after', content: '7 days' }
      ]
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'hy',
    baseUrl,
    locales: [
      { code: 'hy', iso: 'hy-AM', name: 'Հայերեն', file: 'hy.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    langDir: 'locales',
    lazy: false, // 🛑 Դարձրեք false, որպեսզի թարգմանությունները միանգամից ներբեռնվեն
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
})