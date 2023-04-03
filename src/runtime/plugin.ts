import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { AppInsightsModuleOptions } from '../module'
import consoleAppInsights from './stubs/consoleAppInsights'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const options = config.public.appInsights as AppInsightsModuleOptions

  const appInsights = options.enabled
    ? new ApplicationInsights({
        config: {
          instrumentationKey: options.instrumentationKey,
        },
      })
    : consoleAppInsights

  const telemetryInitializer = (envelope: any) => {
    // See https://github.com/microsoft/ApplicationInsights-JS/blob/88cf8edccfefd7d4bcd1657f15715076b83bf325/shared/AppInsightsCommon/src/Interfaces/Contracts/Generated/ContextTagKeys.ts#L213
    // For a list of available tags.

    envelope.tags['ai.cloud.role'] = options.roleName
    // Make sure our AI-events are marked as Browser or Server depending on ssrContext
    envelope.tags['ai.device.type'] = nuxtApp.ssrContext ? 'Server' : 'Browser'
  }

  if (!nuxtApp.ssrContext || options.ssr) {
    appInsights.loadAppInsights()
    appInsights.addTelemetryInitializer(telemetryInitializer)
    appInsights.trackPageView()
  }

  return {
    provide: {
      appInsights,
    },
  }
})
