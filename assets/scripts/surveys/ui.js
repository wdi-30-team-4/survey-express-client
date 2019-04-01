'use strict'

const Chart = require('chart.js')
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
  let taken = false
  data.surveys.forEach((survey) => survey.response.forEach(response => {
    if (response.owner === store.user._id) {
      taken = true
      survey.taken = taken
    }
  }))
}

const getSurveysSuccess = (data) => {
  addAnswers(data)
  addTakenProperty(data)
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
  // create chart.js charts for all results that are displayed
  data.surveys.forEach(survey => {
    const [optionOne, optionTwo] = Object.keys(survey.reducedResponses)
    if (survey.taken) {
      // eslint-disable-next-line
      new Chart(document.getElementById(`bar-chart-${survey._id}`), {
        type: 'horizontalBar',
        data: {
          // labels on the Y axis of chart
          labels: [optionOne, optionTwo],
          datasets: [
            {
              label: '',
              // colors of bars
              backgroundColor: ['#3998cd', '#ff8945'],
              // data to display
              data: [survey.reducedResponses[optionOne], survey.reducedResponses[optionTwo]]
            }
          ]
        },
        options: {
          legend: { display: false },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value) { if (value % 1 === 0) { return value } }
                }
              }
            ]
          }
        }
      })
    }
  })
  $('#getSurveysButton').attr('disabled', 'disabled')
  $('#getMySurveysButton').removeAttr('disabled')
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
  $('#getMySurveysButton').attr('disabled', 'disabled')
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
