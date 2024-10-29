import { expo } from './app.json';
import type { ExportedConfig } from 'expo/config-plugins';

const withCustomAppTheme = require('./with-android-app-theme');

const config = expo as unknown as ExportedConfig;

module.exports = withCustomAppTheme(
  config,
  'Theme.Material3.DayNight.NoActionBar',
);
