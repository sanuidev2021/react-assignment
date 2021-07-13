import { reducer as weatherReducer } from '../features/weather/reducer';
import {reducer as metricReducer} from '../features/dashboard/reducer';

export default {
  weather: weatherReducer,
  metrics: metricReducer,
};
