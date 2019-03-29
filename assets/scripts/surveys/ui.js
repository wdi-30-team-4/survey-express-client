'use strict'

const showSurveysTemplate = require('../templates/survey-listing.handlebars')

const getSurveysSuccess = (data) => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
}

const getSurveysFailure = () => {
  $('#alert-message').html('Failed to get surveys.')
  removeMessage()
}

const createSurveySuccess = () => {
  $('#user-message').html('Survey Created!')
  $('form').trigger('reset')
  removeMessage()
}

const createSurveyFailure = (data) => {
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
  deleteSurveyFailure
}
