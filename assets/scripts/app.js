'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events.js')
const surveyEvents = require('./surveys/events.js')

$(() => {
  $('#create-survey-form').on('submit', surveyEvents.onCreateSurvey)
  $('#getSurveysButton').on('click', surveyEvents.onGetSurveys)
  $('.surveys').on('click', '.delete-survey', surveyEvents.onDeleteSurvey)
  $('.surveys').on('click', '.take-survey', surveyEvents.onTakeSurvey)

  // authorization
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#dropdown-sign-out-link').on('click', authEvents.onSignOut)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  // Show sign-in-form
  $('.sign-in-button').on('click', authEvents.onSignInButton)
  // Show sign-up-form
  $('.sign-up-button').on('click', authEvents.onSignUpButton)
  $('.close-password-modal').on('click', authEvents.onClosePasswordModal)
})
