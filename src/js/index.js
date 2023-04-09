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

async function onSearchForm(event) {
  event.preventDefault();
  addHidden();
  try {
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
    apiServise.fetchPhotoes().then(({ hits }) => {
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
  } catch (err) {
    console.error(err);
  }
}

async function onLoadMore(event) {
  try {
    apiServise.fetchPhotoes().then(({ hits, totalHits }) => {
      renderingMarkup(hits);

      const totalPage = Math.ceil(totalHits / apiServise.perPage);

      if (totalPage === apiServise.page) {
        addHidden();
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          {
            timeout: 1500,
          }
        );
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
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
