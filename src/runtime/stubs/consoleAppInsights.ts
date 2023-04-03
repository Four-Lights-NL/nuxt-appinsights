import * as ai from '@microsoft/applicationinsights-web'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import {
  IDiagnosticLogger,
  INotificationManager,
  ITelemetryItem,
} from '@microsoft/applicationinsights-core-js'
import { IApplicationInsights } from '@microsoft/applicationinsights-web/src/Initialization'

const aiLogger = (name: string, ...args: unknown[]) => {
  console.log(
    `[${process.server ? 'ssr' : 'browser'}] ApplicationInsights stub: ${name}`,
    args
  )
}

// This is just a quick-and-dirty stub to keep your application working when you're not setting up AppInsights.
const consoleAppInsights: ApplicationInsights = {
  addTelemetryInitializer(
    telemetryInitializer: (item: ITelemetryItem) => boolean | void
  ): void {
    aiLogger('addTelemetryInitializer', telemetryInitializer)
  },
  loadAppInsights(
    legacyMode: boolean = false,
    logger?: IDiagnosticLogger,
    notificationManager?: INotificationManager
  ): IApplicationInsights {
    aiLogger('loadAppInsights', 'called')
    return this as IApplicationInsights
  },
  trackEvent(
    event: ai.IEventTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('trackEvent', event, customProperties)
  },
  trackPageView(
    pageView: ai.IPageViewTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('pageView', pageView, customProperties)
  },
  trackException(
    exception: ai.IExceptionTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('trackException', exception, customProperties)
  },
  trackTrace(
    trace: ai.ITraceTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('trackTrace', trace, customProperties)
  },
  trackMetric(
    metric: ai.IMetricTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('trackMetric', metric, customProperties)
  },
  trackPageViewPerformance(
    pageViewPerformance: ai.IPageViewPerformanceTelemetry,
    customProperties?: { [key: string]: any } | undefined
  ): void {
    aiLogger('pageViewPerformance', pageViewPerformance, customProperties)
  },
  trackDependencyData(dependency: ai.IDependencyTelemetry): void {
    aiLogger('trackDependencyData', dependency)
  },
} as ApplicationInsights

export default consoleAppInsights
