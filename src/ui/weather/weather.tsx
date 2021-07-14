import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql'
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/chip';
import { IState } from '../../store';
import {actions} from './reducer';



const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const getWeather = (state: IState) => {
  const { temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    temperatureinFahrenheit,
    description,
    locationName,
  };
};



const Weather = () => {
  const getLocation = useGeolocation();
  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };
  const dispatch = useDispatch();
  const { temperatureinFahrenheit, description, locationName } = useSelector(getWeather);

  const [result] = useQuery({
    query,
    variables: {
      latLong,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getWeatherForLocation } = data;
    dispatch(actions.weatherDataRecevied(getWeatherForLocation));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Chip label={`Weather in ${locationName}: ${description} and ${temperatureinFahrenheit}°`} />;
};

export default Weather;
