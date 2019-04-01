'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onGetSurveys = (event) => {
  if (event) {
    event.preventDefault()
  }
  api.getSurveys()
    .then(ui.getSurveysSuccess)
    .catch(ui.getSurveysFailure)
}

const onMyGetSurveys = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.getSurveys(formData)
    .then(ui.getMySurveysSuccess)
    .catch(ui.getMySurveysFailure)
}

const onCreateSurvey = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createSurvey(formData)
    .then(ui.createSurveySuccess)
    .then(() => onGetSurveys(event))
    .catch(ui.createSurveyFailure)
}

const onTakeSurvey = (event) => {
  event.preventDefault()
  const surveyId = $(event.target).closest('div').data('id')
  const radioValue = $(`input[name='${surveyId}']:checked`).val()
  api.takeSurvey(surveyId, radioValue)
    .then(() => onGetSurveys(event))
    .then(ui.takeSurveySuccess)
    .catch(ui.takeSurveyFailure)
}

const onDeleteSurvey = (event) => {
  event.preventDefault()
  const surveyId = $(event.target).closest('div').data('id')
  api.deleteSurvey(surveyId)
    .then(ui.deleteSurveySuccess)
    .then(() => onMyGetSurveys(event))
    .catch(ui.deleteSurveyFailure)
}

const onUpdateSurvey = (event) => {
  event.preventDefault()
  const form = $(event.target).closest('form')[0]
  const formData = getFormFields(form)
  const id = event.target.id

  api.updateSurvey(id, formData)
    .then(ui.updateSurveySuccess)
    .then(() => onGetSurveys(event))
    .catch(ui.updateSurveyFailure)
}

module.exports = {
  onGetSurveys,
  onDeleteSurvey,
  onTakeSurvey,
  onCreateSurvey,
  onMyGetSurveys,
  onUpdateSurvey
}
