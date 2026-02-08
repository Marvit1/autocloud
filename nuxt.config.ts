// nuxt.config.ts
declare const process: {
  env: { [key: string]: string | undefined }
}

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
      baseUrl: process.env.BASE_URL || 'https://www.autoswift.shop',
      apiBase: process.env.API_BASE_URL || 'https://api.autoswift.shop',
      siteName: 'AutoSwift',
    }
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: ['/', '/en', '/ru']
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
        { rel: 'icon', type: 'image/x-icon', href: '/images/logs.jpg' }, // Ստանդարտ favicon
        { rel: 'apple-touch-icon', href: '/aa.jpg' }, // iOS-ի համար
        { rel: 'canonical', href: 'https://www.autoswift.shop' },
        { rel: 'preconnect', href: 'https://api.autoswift.shop' }
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#667eea' },
        { name: 'description', content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։' },
        { name: 'keywords', content: 'ավտոմեքենա, մեքենա գնել, ավտոմեծ, վաճառք, Հայաստան' },

        // ✅ FACEBOOK / OPEN GRAPH
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'AutoSwift' },
        { property: 'og:url', content: 'https://www.autoswift.shop' },
        { property: 'og:title', content: 'AutoSwift - ավտոմեքենաների խանութ' },
        { property: 'og:description', content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։' },
        
        // ⚠️ Օգտագործում ենք բացարձակ հղում նկարի համար
        { property: 'og:image', content: 'https://www.autoswift.shop/images/logs.jpg' },
        { property: 'og:image:secure_url', content: 'https://www.autoswift.shop/images/logs.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'AutoSwift Logo' },

        // ✅ TWITTER
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AutoSwift - ավտոմեքենաների խանութ' },
        { name: 'twitter:description', content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ...' },
        { name: 'twitter:image', content: 'https://www.autoswift.shop/images/logs.jpg' },

        // ✅ SEO & Robots
        { name: 'robots', content: 'index, follow' },
        { name: 'revisit-after', content: '7 days' }
      ]
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'hy',
    baseUrl: 'https://www.autoswift.shop',
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