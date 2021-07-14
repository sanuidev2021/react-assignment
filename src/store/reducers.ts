import { reducer as weatherReducer } from '../ui/weather/reducer';
import {reducer as metricReducer} from '../ui/dashboard/reducer';

export default {
  weather: weatherReducer,
  metrics: metricReducer,
};
