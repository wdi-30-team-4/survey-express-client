'use strict'

const showSurveysTemplate = require('../templates/survey-listing.handlebars')
const showMySurveysTemplate = require('../templates/my-survey-listing.handlebars')
const store = require('../store.js')

const reduceResponses = responses => {
  return responses.reduce((acc, response) => {
    acc[response.answer] = (acc[response.answer] || 0) + 1
    return acc
  }, {})
}

const addAnswers = (data) => {
  const surveyObjects = data.surveys
  const newSurveyObjects = surveyObjects.map(survey => {
    const reducedResponses = reduceResponses(survey.response)
    survey['reducedResponses'] = reducedResponses
    return data
  })
  return newSurveyObjects
}

const getSurveysSuccess = (data) => {
  addAnswers(data)
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
}

const getSurveysFailure = () => {
  $('#alert-message').html('Failed to get surveys.')
  removeMessage()
}

const getMySurveysSuccess = (data) => {
  const userSurvey = data.surveys.filter((survey) => survey.owner === store.user._id)
  const showMySurveysHtml = showMySurveysTemplate({ surveys: userSurvey })
  $('.surveys').html(showMySurveysHtml)
}

const getMySurveysFailure = () => {
  $('#alert-message').html('Failed to get surveys.')
  removeMessage()
}

const createSurveySuccess = () => {
  $('#user-message').html('Survey Created!')
  $('form').trigger('reset')
  removeMessage()
}

const createSurveyFailure = () => {
  $('#user-message').html(`Failed to create survey.`)
  $('form').trigger('reset')
  removeMessage()
}

const deleteSurveySuccess = () => {
  $('#user-message').html('Survey Deleted.')
  removeMessage()
}
const deleteSurveyFailure = () => {
  $('#user-message').html('Failed to delete survey.')
  removeMessage()
}

const takeSurveySuccess = () => {
  $('#user-message').html('Survey Completed!')
  $('form').trigger('reset')
  removeMessage()
}

const takeSurveyFailure = () => {
  $('#user-message').html(`Failed to complete survey.`)
  $('form').trigger('reset')
  removeMessage()
}

let timeOut = null

const stopTimeout = function () {
  clearTimeout(timeOut)
}

const removeMessage = function () {
  stopTimeout()
  timeOut = setTimeout(() => {
    $('#user-message').html('')
    $('#modal-alert-message').html('')
  }, 3500)
}

module.exports = {
  getSurveysSuccess,
  getSurveysFailure,
  createSurveySuccess,
  createSurveyFailure,
  deleteSurveySuccess,
  deleteSurveyFailure,
  takeSurveySuccess,
  takeSurveyFailure,
  getMySurveysSuccess,
  getMySurveysFailure
}
