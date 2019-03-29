'use strict'

const toastr = require('toastr')
const store = require('../store.js')

const signUpSuccess = () => {
  toastr.success('Sign-up successful, please sign in.')
  $('form').trigger('reset')
  $('#sign-up-form').addClass('hidden')
  showSignInForm()
}

const signUpFailure = () => {
  toastr.failure('Error on Sign-up.')
  $('form').trigger('reset')
}

const signInSuccess = (responseData) => {
  $('form').trigger('reset')
  store.user = responseData.user
  $('.navbar-nav').removeClass('hidden')
  $('.create-survey-area').removeClass('hidden')
  $('.survey-area').removeClass('hidden')
  $('#navbarDropdownMenuLink').html(store.user.email)
  $('.sign-in-display').addClass('hidden')
  $('.swap-form-display').addClass('hidden')
}

const signInFailure = () => {
  toastr.failure('Error on Sign-in.')
  $('form').trigger('reset')
}

const changePasswordSuccess = () => {
  $('#modal-alert-message').html('Password Change Successful!')
  $('form').trigger('reset')
}

const changePasswordFailure = () => {
  $('#modal-alert-message').html('Error Changing Password. Please try again.')
  $('form').trigger('reset')
}

const signOutSuccess = () => {
  toastr.success('Successfully Signed-Out!')
  $('form').trigger('reset')
  $('.navbar-nav').addClass('hidden')
  $('.swap-form-display').removeClass('hidden')
  $('.create-survey-area').addClass('hidden')
  $('.survey-area').addClass('hidden')
  store.user = {}
  showSignUpForm()
}

const signOutFailure = () => {
  toastr.failure('Error Signing Out!')
  $('form').trigger('reset')
}

const showSignInForm = function () {
  $('.sign-up-display').addClass('hidden')
  $('.sign-in-display').removeClass('hidden')
  $('.sign-in-button').addClass('hidden')
  $('.sign-up-button').removeClass('hidden')
  $('form').trigger('reset')
  $('.swap-form-message').html('Need an account?')
}

const showSignUpForm = function () {
  $('.sign-in-display').addClass('hidden')
  $('.sign-up-display').removeClass('hidden')
  $('.sign-up-button').addClass('hidden')
  $('.sign-in-button').removeClass('hidden')
  $('form').trigger('reset')
  $('.swap-form-message').html('Already have an account?')
}

const closePasswordModal = function () {
  $('#changePasswordModal').modal('toggle')
  // wait until modal fades before reseting forms
  setTimeout(() => {
    $('#change-password-form').trigger('reset')
  }, 1500)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  showSignInForm,
  showSignUpForm,
  closePasswordModal
}
