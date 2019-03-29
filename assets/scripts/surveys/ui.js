'use strict'

const toastr = require('toastr')
const showSurveysTemplate = require('../templates/survey-listing.handlebars')
const showMySurveysTemplate = require('../templates/my-survey-listing.handlebars')
const store = require('../store.js')

const getSurveysSuccess = (data) => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
}

const getSurveysFailure = () => {
  toastr.error('Failed to get surveys.')
}

const getMySurveysSuccess = (data) => {
  const userSurvey = data.surveys.filter((survey) => survey.owner === store.user._id)
  const showMySurveysHtml = showMySurveysTemplate({ surveys: userSurvey })
  $('.surveys').html(showMySurveysHtml)
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
}

const updateSurveyFailure = () => {
  toastr.failure(`Failed to update survey.`)
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
