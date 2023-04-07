import '../css/styles.css';
import galleryMarkupTpl from '../gallery.hbs';
import ApiServise from './fetchFunction';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('#search-form');
const searchBtn = document.querySelector('#search-form button');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

const apiServise = new ApiServise();

formEl.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMore);

addHidden();

function onSearchForm(event) {
  event.preventDefault();
  addHidden();
  apiServise.query = event.currentTarget.elements.searchQuery.value.trim();

  if (apiServise.query === '') {
    clearMarkup();
    addHidden();
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  clearMarkup();
  apiServise.resetPage();
  apiServise.fetchPhotoes().then(hits => {
    if (hits.length === 0) {
      addHidden();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderingMarkup(hits);
    removeHidden();
  });
}

function onLoadMore(event) {
  apiServise.fetchPhotoes().then(renderingMarkup);
}

function addHidden() {
  loadMoreBtn.classList.add('is-hidden');
}

function removeHidden() {
  loadMoreBtn.classList.remove('is-hidden');
}

function renderingMarkup(photoes) {
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkupTpl(photoes));
}

function clearMarkup() {
  galleryEl.innerHTML = '';
}
