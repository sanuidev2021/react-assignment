import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles,Theme, Typography} from '@material-ui/core';
import { useQuery } from 'urql';
import Select, {OptionsType} from 'react-select';
import {getMetricsQuery} from './api';
import {Option} from './types';
import {actions,getSelectedItems} from './reducer';
import MetricCard from '../../components/metric-card';
import Graphs from '../../components/graph';


const useStyles = makeStyles((theme:Theme) => ({
        select:{
            margin: '1.5rem 0px 1.5rem 0',
        },
}));

const Metrics:React.FC = () => {

    const classes = useStyles();
    const [result] = useQuery({
        query:getMetricsQuery,
    });
    const dispatch = useDispatch();

    const [options, setOPtions] = useState<OptionsType<Option>>([])
    
    useEffect(() => {
        const {data, error} = result;
        if (error) {
            return;
        }
        if (!data) return;
        const {getMetrics} = data;
        setOPtions(getMetrics.map((option:string) => ({label:option, value:option})))
    },[dispatch, result])

    const selectedItems = useSelector(getSelectedItems);

    const onChange = (items: OptionsType<Option>, action:any) => {
        const newMetric = action && action.option && action.option.value;
        const selectedItems = items ? items.map((item:Option) => item.value):[]
        dispatch(actions.metricsSelected({selected: selectedItems, newMetric: newMetric || ''}));
    }
    return(
        <Container>
            <Select className = {classes.select} options = {options} isMulti onChange = {onChange}/>
            <MetricCard/>
            {selectedItems.length === 0 ? <Typography>Please Select a value from Dropdown</Typography>: <Graphs/>}
        </Container>
    )
}

export default Metrics;