'use strict'

const config = require('../config')
const store = require('../store.js')

const getSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createSurvey = function (formData) {
  console.log("============", formData)
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'title': formData.title,
        'question': formData.question
      }
    }
  })
}

module.exports = {
  getSurveys,
  createSurvey
}
