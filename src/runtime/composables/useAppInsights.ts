import { useNuxtApp } from '#app'

import * as ai from '@microsoft/applicationinsights-web'

export default function useAppInsights(): ai.IApplicationInsights {
  return useNuxtApp().$appInsights
}
