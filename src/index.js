import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { LoadMoreBtn } from './scripts/loadMoreBtn';
import { PhotosAPI } from './scripts/api';

const API_KEY = '33649994-f80483f60ad654d1c20b01729';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmitForm);

const photoAPI = new PhotosAPI();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMoreBtn);
const simplelightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

async function onSubmitForm(e) {
  e.preventDefault();

  photoAPI.query = e.currentTarget.elements.searchQuery.value.trim();

  if (photoAPI.query === '') {
    Notify.warning('Please enter text.');
    return;
  }

  photoAPI.resetPage();

  try {
    const { hits, totalHits } = await photoAPI.fetchAPI();

    if (totalHits === 0) {
      Notify.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      loadMoreBtn.hide();
      return;
    }

    Notify.success(`Hooray! We found '${totalHits}'' images.`);
    render(hits);
    simplelightbox.refresh();
    loadMoreBtn.show();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMoreBtn() {
  loadMoreBtn.loading();

  try {
    const { hits } = await photoAPI.fetchAPI();
    render(hits);
    loadMoreBtn.endLoading();

    if (hits.length < 40) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function render(hits) {
  gallery.innerHTML = '';
  const photos = hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
        <a href="${largeImageURL}"> 
                <img src="${webformatURL}" alt="${tags}" loading="lazy" height = "250" />
              </a>
        <div class="info">
          <p class="info-item">
            <b> Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', photos.join(''));
}
