import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { green, indigo, amber, deepPurple, lightGreen, brown } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { getMetrics, getSelectedItems } from '../ui/dashboard/reducer';


const getAxisID = (metric:string) => {
    if (metric.toLowerCase().endsWith('pressure')) {
        return 1;
    } else if (metric.toLowerCase().endsWith('temp')) {
        return 2;
    }
    return 0
};

const COLORS = [brown[500], amber[600], deepPurple[500], lightGreen[500], indigo[400], green[500]];

const useStyles = makeStyles(theme => ({
    graphContainer: {
      width: '60vw',
      height: '60vh',
      marginTop: '2rem',
    },
    main: {
      padding: theme.spacing(3),
      background: 'white',
    },
  }));

interface IUnits {
    [key:string]: {
    enabled: boolean;
    value: string;
    dx: number;
    dy: number;
    angle: number;
    yAxisId: number;
    fontSize?: number;
    tickFormatter?: (value: number) => string;
    }
}

const Graphs: React.FC = () => {
    const classes = useStyles();
    const selectedItems = useSelector(getSelectedItems);
    const metrics = useSelector(getMetrics);
    const data = Object.keys(metrics).map(key => metrics[key])

    const units: IUnits = {
        percentage:{
            enabled: selectedItems.some((m:string) => getAxisID(m) === 0),
            value: '%',
            dx: 10,
            dy: 10,
            angle: -90,
            yAxisId:0,
        },
        pressure: {
            enabled: selectedItems.some((m: string) => getAxisID(m) === 1),
            value: 'PSI',
            dx: 10,
            dy: 10,
            angle: -90,
            fontSize: 12,
            yAxisId: 1,
            tickFormatter: (value: number): string => (value >= 1000 ? `${value / 1000}K` : value.toString()),
        },
        temparatue: {
            enabled: selectedItems.some((m: string) => getAxisID(m) === 2),
            value: 'F',
            dx: 10,
            dy: 15,
            angle: -90,
            fontSize: 12,
            yAxisId: 2,
        },
    };
    return(
        <Grid container className={classes.graphContainer}>
            <ResponsiveContainer>
                <LineChart width={400} height={400} data={data}>
                {selectedItems.map((metric, index) => {
                return (
                  <Line key={metric} yAxisId={getAxisID(metric)} dataKey={metric} stroke={COLORS[index]} dot activeDot />
                );
              })}
              {selectedItems.length > 0 && <XAxis dataKey="at" interval={150} />}
              {Object.keys(units).map(key => {
            const { enabled, yAxisId, tickFormatter, ...rest } = units[key];
            return (
              enabled && (
                <YAxis
                  key={key}
                  label={{ position: 'insideTopLeft', offset: 0, fill: '#908e8e', ...rest }}
                  yAxisId={yAxisId}
                  tickFormatter={tickFormatter}
                />
              )
            );
          })}
                <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Grid>)
}

export default Graphs;
