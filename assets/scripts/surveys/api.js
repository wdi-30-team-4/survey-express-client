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
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'title': formData.title,
        'question': formData.question,
        'options': [formData.optionOne, formData.optionTwo]
      }
    }
  })
}

const deleteSurvey = function (id) {
  return $.ajax({
    url: config.apiUrl + `/surveys/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const takeSurvey = function (surveyId, responseBoolean) {
  return $.ajax({
    url: config.apiUrl + `/responses`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'response': {
        'answer': responseBoolean,
        'question': surveyId
      }
    }
  })
}

const updateSurvey = function (id, formData) {
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + `/surveys/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'title': formData.title,
        'question': formData.question,
        'options': [formData.optionOne, formData.optionTwo]
      }
    }
  })
}

module.exports = {
  getSurveys,
  createSurvey,
  deleteSurvey,
  takeSurvey,
  updateSurvey
}
