/* eslint no-unused-vars: 'off'*/

import '../bower_components/toastr/toastr.css';
import '../js/app.css';
import '../js/app.standard.css';

const jQuery = require('jquery');
const Chart = require('chart.js');
const toastr = require('toastr');

window.jQuery = jQuery;
window.toastr = toastr;

const angular = require('angular');
const ngAnimate = require('angular-animate');
const ngRoute = require('angular-route');
const ngResource = require('angular-resource');
const ngChart = require('angular-chart.js');
