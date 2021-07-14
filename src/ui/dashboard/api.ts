export const getMetricsQuery = `
    query {
        getMetrics
    }
`;

export const newMeasurementSubscription = `
    subscription {
        newMeasurement {
            at
            metric
            value
            unit
        }
    }
`;

export const getLastKnownMeasurementQuery = `query ($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
        metric
        value
        at
        unit
    }
}`