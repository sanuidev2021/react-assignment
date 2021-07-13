import { reducer as weatherReducer } from '../features/Weather/reducer';
import {reducer as metricReducer} from '../features/Dashboard/reducer';

export default {
  weather: weatherReducer,
  metrics: metricReducer,
};
