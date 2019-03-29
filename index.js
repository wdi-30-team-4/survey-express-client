'use strict'

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

import 'bootstrap'

// import and configure toastr
const Toastr = require('toastr')
Toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-center',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

// allows usage of new JS features
require('babel-polyfill')

// load manifests
// scripts
require('./assets/scripts/app.js')

// styles
require('./assets/styles/index.scss')
require('./node_modules/toastr/build/toastr.css')
