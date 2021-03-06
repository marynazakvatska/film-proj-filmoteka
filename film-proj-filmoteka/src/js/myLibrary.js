import refs from './refs/refs';
import moviesList from '../templates/hero_movies.hbs';
import { stopSpin } from './spinner/spinner';
import localStorage from './services/localStorage';

let storage = new localStorage();

function clearMarkup() {
  refs.filmsMarkup.innerHTML = '';
}

function renderFilmsCard(data) {
  refs.filmsMarkup.insertAdjacentHTML('beforeend', moviesList(data));
  const moviesCardVoteEl = document.querySelectorAll('.movies-card-vote');
  moviesCardVoteEl.forEach(classList => {
    classList.classList.add('is-hidden');
  });
  stopSpin();
}

refs.libraryBtn.addEventListener('click', () => {
  clearMarkup();
  watchedFilmsRender();
  refs.searchWrap.classList.add('visually-hidden'); //cкрывает поиск инпут

  refs.libraryBtn.classList.add('current'); //подчеркивание library

  refs.libraryBtnsContainer.classList.remove('visually-hidden'); // показывает кнопки

  refs.homeBtn.classList.remove('current'); //убирает подчеркивание c кнопки home

  refs.headerBg.classList.add('library__background'); //добавляет фон library

  refs.headerBg.classList.remove('header__background'); //скрывает фон header

  refs.paginationContainer.classList.add('disactive-pagination'); //скрывает пагинацию кнопок

  // document.querySelector('.arrow-slider').classList.toggle('is-hidden');//скрывает пагинацию стрелки
});

refs.watchedBtn.addEventListener('click', watchedFilmsRender);
refs.queueBtn.addEventListener('click', queueFilmsRender);

function watchedFilmsRender() {
  clearMarkup();
  renderFilmsCard(
    storage.getWatched().map(film => ({
      ...film,
      release_date: film.release_date.slice(0, 4),
    })),
  );

  // Делает карточки Watched
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
  // document.querySelector('.arrow-slider').classList.toggle('is-hidden');//скрывает пагинацию стрелки

}

function queueFilmsRender() {
  
  clearMarkup();
  renderFilmsCard(
    storage.getQueue().map(film => ({
      ...film,
      release_date: film.release_date.slice(0, 4),
    })),
  );

  // Делает карточки Queue
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');
  // document.querySelector('.arrow-slider').classList.toggle('is-hidden');//скрывает пагинацию стрелки

}
refs.homeBtn.addEventListener('click', onHomeAndLogo);
refs.logo.addEventListener('click', onHomeAndLogo);

function onHomeAndLogo() {
  refs.homeBtn.classList.add('current');

  refs.libraryBtn.classList.remove('current');

  refs.searchWrap.classList.remove('visually-hidden');

  refs.libraryBtnsContainer.classList.add('visually-hidden');

  refs.headerBg.classList.remove('library__background');

  refs.headerBg.classList.add('header__background');

  refs.heroBlock.classList.remove('visually-hidden');

  refs.paginationContainer.classList.remove('disactive-pagination');
}
