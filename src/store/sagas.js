import { spawn } from 'redux-saga/effects';
import weatherSaga from '../features/weather/saga';
import metricSaga from '../features/dashboard/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricSaga);
}
