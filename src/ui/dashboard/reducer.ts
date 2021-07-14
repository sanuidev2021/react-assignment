import  { createSlice, PayloadAction } from 'redux-starter-kit';
import {MetricsState,SelectPayload,IMetric,MetricsWithLatest,MetricsPayload} from './types';
import { IState } from '../../store';


const initialState: MetricsState = {
    selected:[], 
    metrics:{},  
    latestValue:{},
}

const slice = createSlice({
    initialState,
    name:'metricsReducer',
    reducers:{
        metricsSelected: (state, action: PayloadAction<SelectPayload>) => {
            const {selected} = action.payload;
            return {
                ...state,
                selected,
            };
        },
        metricDataReceived: (state, action: PayloadAction<MetricsWithLatest>) => {
            const {metrics, latestValue} = action.payload;
            return {
                ...state,
                metrics,
                latestValue,

            };
        },
        multipleMetricsDataReceived: (state, action:PayloadAction<MetricsPayload>) => {
            const {metrics} = action.payload;
            return {
                ...state,
                metrics,
            };
        },
        
        newMetricValueFectched: (state, action: PayloadAction<IMetric>) => state,
    },
});

export const getSelectedItems = ({metrics}: IState) => metrics.selected;

export const getMetrics = ({metrics: {metrics}}: IState) => metrics;

export const getLatestValue = (state: IState) => state.metrics.latestValue;

export const { reducer, actions } = slice;
