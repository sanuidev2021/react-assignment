import { spawn } from 'redux-saga/effects';
import weatherSaga from '../ui/weather/saga';
import metricSaga from '../ui/dashboard/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricSaga);
}
