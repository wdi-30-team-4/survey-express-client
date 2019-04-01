'use strict'

const toastr = require('toastr')
const showSurveysTemplate = require('../templates/survey-listing.handlebars')
const showMySurveysTemplate = require('../templates/my-survey-listing.handlebars')
const store = require('../store.js')

const reduceResponses = (responses, options) => {
  // set keys of options into empty responses object
  const emptyResponses = {}
  emptyResponses[options[0]] = 0
  emptyResponses[options[1]] = 0
  // reduce responses into counts of each key, ignore responses that aren't options
  return responses.reduce((acc, response) => {
    if (response.answer in acc) {
      acc[response.answer] = acc[response.answer] + 1
    }
    return acc
  }, emptyResponses)
}

const addAnswers = (data) => {
  const surveyObjects = data.surveys
  const newSurveyObjects = surveyObjects.map(survey => {
    const reducedResponses = reduceResponses(survey.response, survey.options)
    survey.reducedResponses = reducedResponses
    return data
  })
  return newSurveyObjects
}

const addTakenProperty = (data) => {
  data.surveys.forEach((survey) => survey.response.forEach(response => {
    if (response.owner === store.user._id) {
      survey.taken = true
    } else {
      survey.taken = false
    }
  }))
}

const getSurveysSuccess = (data) => {
  addAnswers(data)
  addTakenProperty(data)
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
  $('#getSurveysButton').attr('disabled', 'disabled')
}

const getSurveysFailure = () => {
  toastr.error('Failed to get surveys.')
}

const getMySurveysSuccess = (data) => {
  addAnswers(data)
  const userSurvey = data.surveys.filter((survey) => survey.owner === store.user._id)
  const showMySurveysHtml = showMySurveysTemplate({ surveys: userSurvey })
  $('.surveys').html(showMySurveysHtml)
  $('#getSurveysButton').removeAttr('disabled')
}

const getMySurveysFailure = () => {
  toastr.error('Failed to get surveys.')
}

const createSurveySuccess = () => {
  toastr.success('Survey Created!')
  $('form').trigger('reset')
}

const createSurveyFailure = () => {
  toastr.error(`Failed to create survey.`)
  $('form').trigger('reset')
}

const deleteSurveySuccess = () => {
  toastr.success('Survey Deleted.')
}
const deleteSurveyFailure = () => {
  toastr.error('Failed to delete survey.')
}

const takeSurveySuccess = () => {
  toastr.success('Survey Completed!')
  $('form').trigger('reset')
}

const takeSurveyFailure = () => {
  toastr.error(`Failed to complete survey.`)
  $('form').trigger('reset')
}

const updateSurveySuccess = () => {
  toastr.success(`Update successful!`)
  $('form').trigger('reset')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
}

const updateSurveyFailure = () => {
  toastr.error(`Failed to update survey.`)
  $('form').trigger('reset')
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
  getMySurveysFailure,
  updateSurveyFailure,
  updateSurveySuccess
}
