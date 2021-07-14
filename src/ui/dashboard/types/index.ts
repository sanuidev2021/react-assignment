import { OptionTypeBase } from 'react-select';

export interface IMetric {
    metric: string;
    at: string;
    value: number;
    unit: string;
}

export interface MetricsState {
    metrics: {
        [at: string]: IMetric;
    };
    latestValue: {
        [metric: string]: number;
    };
    selected: string[];    
}

export interface MetricsWithLatest {
    metrics: {
        [at: string]: IMetric;
    };
    latestValue: {
        [metric:string]: number;
    };
}

export interface MetricsPayload {
    metrics: {
        [at: string]: IMetric;
    }
}
export interface CardProps {
    metricName: string;
    currentValue: number;
}

export interface QueryResult {
    getLastKnownMeasurement: {
        value: number;
    };
}

export interface QueryArgs {
    metricName: string;
}

export interface SelectPayload {
    selected: string[];
    newMetric: string;
}

export interface Option extends OptionTypeBase {
    label: string;
    value: string;
  }