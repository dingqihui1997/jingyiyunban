import Vue from 'vue';
import IscSvgIcon from '@isyscore/icons';

const webpackContext = require.context('@/assets/svg', true, /\.svg$/);
webpackContext.keys().forEach((key) => webpackContext(key));

Vue.use(IscSvgIcon, { common: true, nav: true, business: true });
