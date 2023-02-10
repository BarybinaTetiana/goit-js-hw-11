import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();

  fetchCountries(searchQuery)
    .then(data => {
      if (searchQuery === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      }

      if (data.length > 10) {
        return Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length >= 2 && data.length < 10) {
        createCountryList(data);
        countryInfo.innerHTML = '';
        return;
      }
      if (data.length === 1) {
        countryList.innerHTML = '';
        createCountryInfo(data);
        return;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function createCountryList(data) {
  countryList.innerHTML = createCountryList(data);
}

function createCountryInfo(data) {
  countryInfo.innerHTML = createMarkupCountryInfo(data);
}

function createCountryList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src='${flags.svg}' alt="flag" width="50px"/><h2>${name.official}</h2></li>`
    )
    .join('');
}

function createMarkupCountryInfo(data) {
  return data
    .map(
      ({
        name,
        capital,
        population,
        flags,
        languages,
      }) => `<div class="infolist"><img src="${
        flags.svg
      }" alt="flag" width="90px"/><h2>${name.official}</h2></div><div>
    <p><b>Capital:</b> ${capital}</p><p><b>Population:</b> ${population}</p><p><b>Languages:</b>${Object.values(
        languages
      )}</p></div>`
    )
    .join('');
}
