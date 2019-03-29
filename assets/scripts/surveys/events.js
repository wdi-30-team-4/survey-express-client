'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

// const data = {'surveys': [
//   {'_id': '5c9ccec3d9e5b7435dd51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'Pizza Question', 'question': 'Do you like pizza?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []},
//   {'_id': '5c9ccec3dsdfsdf51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'Cool Test', 'question': 'Are you cool?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []},
//   {'_id': '5sdfsdfd51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'MVP Survey', 'question': 'Does your team project meet mvp?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []}
// ]}

const onGetSurveys = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.getSurveys(formData)
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
    .then(ui.takeSurveySuccess)
    .catch(ui.takeSurveyFailure)
}

const onDeleteSurvey = (event) => {
  event.preventDefault()
  const surveyId = $(event.target).closest('div').data('id')
  api.deleteSurvey(surveyId)
    .then(ui.deleteSurveySuccess)
    .then(() => onGetSurveys(event))
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
