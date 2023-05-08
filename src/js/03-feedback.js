import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textAreaEl = document.querySelector('.feedback-form textarea');

const FEEDBACK_KEY = 'feedback-form-state';
let formDataValue = {};

populateFormData();

form.addEventListener(
  'input',
  throttle(event => {
    formDataValue[event.target.name] = event.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formDataValue));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  if (inputEl.value !== '' && textAreaEl.value !== '') {
    console.log(formDataValue);
    localStorage.removeItem(FEEDBACK_KEY);
    event.target.reset();
    return;
  }
  alert('Please fill in the all fields');
});

function populateFormData() {
  const savedElements = localStorage.getItem(FEEDBACK_KEY);
  if (savedElements) {
    formDataValue = JSON.parse(savedElements);
    inputEl.value = formDataValue.email || '';
    textAreaEl.value = formDataValue.message || '';
  }
}
