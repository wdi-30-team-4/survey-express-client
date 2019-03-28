'use strict'

const showSurveysTemplate = require('../templates/survey-listing.handlebars')

const getSurveysSuccess = (data) => {
  console.log(data)
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('.surveys').html(showSurveysHtml)
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getSurveysSuccess,
  failure
}
