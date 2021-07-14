import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useSubscription, useQuery } from 'urql';
import {actions,getSelectedItems,getLatestValue} from '../ui/dashboard/reducer';
import { IMetric } from '../ui/dashboard/types';
import {newMeasurementSubscription, getLastKnownMeasurementQuery} from '../ui/dashboard/api';
import { CardProps, QueryResult, QueryArgs } from '../ui/dashboard/types';


const MetricCard: React.FC<CardProps> = ({metricName, currentValue}) => {
    const [value, setValue] = useState(currentValue)
    const [result] = useQuery<QueryResult, QueryArgs>({
        query: getLastKnownMeasurementQuery,
        variables: {
            metricName,
            },
    });
    useEffect(() => {
        const {data, error} = result;
        if (error){
            return;
        }
        if (!data) return;
        const { getLastKnownMeasurement } = data;
        setValue(getLastKnownMeasurement ? getLastKnownMeasurement.value: 0);
    },[result])
    return(
        <Card elevation={2}>
            <CardHeader title = {metricName} />
            <CardContent>
                    <Typography variant="h4">{currentValue ? currentValue: value}</Typography>
            </CardContent>
        </Card>
    )
}


interface SubscriptionData {
    newMeasurement: IMetric;
  }

const MetricCardSection: React.FC = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector(getSelectedItems);
    const latestValue = useSelector(getLatestValue);
    const [result] = useSubscription<SubscriptionData>({
        query: newMeasurementSubscription,
        pause: !selectedItems.length,
    })
    const { data } = result;

    useEffect(() => {
        data && dispatch(actions.newMetricValueFectched(data.newMeasurement)); 
    },[data,dispatch])

    return(
        <Grid container spacing={1}>
            {selectedItems.map(metric => (
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <MetricCard metricName={metric} currentValue={latestValue[metric]} />
            </Grid>
            ))}
        </Grid>
    );
};
export default MetricCardSection;