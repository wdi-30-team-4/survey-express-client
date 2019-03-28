'use strict'

const showSurveysTemplate = require('../templates/survey-listing.handlebars')

const getSurveysSuccess = (data) => {
  console.log(data)
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
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

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getSurveysSuccess,
  createSurveySuccess,
  createSurveyFailure,
  failure
}
