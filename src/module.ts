import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import defu from 'defu'

export interface AppInsightsModuleOptions {
  /**
   * Enable AppInsights
   * @default true
   * @type boolean
   */
  enabled: boolean

  /**
   * Enable on ssr
   * @default true
   * @type boolean
   */
  ssr: boolean

  /**
   * Instrumentation key
   * @default null
   * @type string
   */
  instrumentationKey: string

  /**
   * Role name
   * @default "nuxt-app"
   * @type string
   */
  roleName: string
}

export default defineNuxtModule<AppInsightsModuleOptions>({
  meta: {
    name: 'nuxt-appinsights',
    configKey: 'appInsights',
  },
  defaults: {
    enabled: true,
    ssr: true,
    roleName: 'nuxt-app',
    instrumentationKey: '',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    nuxt.options.runtimeConfig.public.appInsights = defu(
      nuxt.options.runtimeConfig.public.appInsights,
      {
        enabled: options.enabled,
        instrumentationKey: options.instrumentationKey,
        ssr: options.ssr,
        roleName: options.roleName,
      }
    )

    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolver.resolve(runtimeDir, 'plugin'))

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve(runtimeDir, 'composables'))
    })
  },
})
