'use strict'

// const api = require('./api.js')
const ui = require('./ui.js')

const data = {'surveys': [
  {'_id': '5c9ccec3d9e5b7435dd51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'Pizza Question', 'question': 'Do you like pizza?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []},
  {'_id': '5c9ccec3d9e5b7435dd51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'Cool Test', 'question': 'Are you cool?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []},
  {'_id': '5c9ccec3d9e5b7435dd51aa9', 'updatedAt': '2019-03-28T13:40:19.047Z', 'createdAt': '2019-03-28T13:40:19.047Z', 'title': 'MVP Survey', 'question': 'Does your team project meet mvp?', 'owner': '5c9cce47d9e5b7435dd51aa7', '__v': 0, 'responses': []}
]}

const onGetSurveys = (event) => {
  event.preventDefault()
  // api.getSurveys()
  //   .then(ui.getSurveySuccess)
  //   .catch(ui.failure)
  ui.getSurveysSuccess(data)
}

module.exports = {
  onGetSurveys
}
