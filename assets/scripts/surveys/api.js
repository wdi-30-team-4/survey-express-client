'use strict'

const config = require('../config')

const getSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys'
  })
}

module.exports = {
  getSurveys
}
