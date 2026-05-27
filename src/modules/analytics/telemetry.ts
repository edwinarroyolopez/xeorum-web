type TelemetryEvent = {
  name: string;
  payload?: Record<string, unknown>;
};

export function trackEvent(event: TelemetryEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent('xeorum:telemetry', {
      detail: {
        ...event,
        timestamp: Date.now(),
      },
    })
  );
}
