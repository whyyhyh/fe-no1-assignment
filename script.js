var API_KEY = 'api 입력';
var movieList = document.getElementById('movie-list');
var modal = document.getElementById('movie-modal');
var modalDetails = document.getElementById('modal-details');
var closeButton = document.querySelector('.close-button');
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');

closeButton.onclick = function () {
  modal.className = 'modal hidden';
};
function showMovies(movies) {
  movieList.innerHTML = '';
  for (var i = 0; i < movies.length; i++) {
    var m = movies[i];
    var card = document.createElement('div');
    card.className = 'movie-card';

    var img = document.createElement('img');
    img.src = 'https://image.tmdb.org/t/p/w300' + m.poster_path;
    img.alt = m.title;
    var title = document.createElement('div');
    title.className = 'movie-title';
    title.innerText = m.title;
    var rating = document.createElement('div');
    rating.className = 'movie-rating';
    rating.innerText = '평점: ' + m.vote_average;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(rating);
    movieList.appendChild(card);

    (function (movie) {
      card.onclick = function () {
        var url = 'https://api.themoviedb.org/3/movie/' + movie.id +
          '?api_key=' + API_KEY + '&language=ko-KR';
        fetch(url)
          .then(function (res) { return res.json(); })
          .then(function (detail) {
            var html = '<h2>' + detail.title + '</h2>' + '<p>개봉일: ' + detail.release_date + '</p>' + '<p>요약:' + (detail.overview || '-') + '</p>';
            modalDetails.innerHTML = html;
            modal.className = 'modal';
          });
      };
    })(m);
  }
}

window.onload = function () {
  var topUrl = 'https://api.themoviedb.org/3/movie/top_rated' +
    '?language=ko&page=1';
  var options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer 입력' } };
  fetch(topUrl, options)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var arr = data.results;
      var list = arr.slice(0, 6);
      showMovies(list);
    });

  searchButton.onclick = function () {
    event.preventDefault();
    var q = searchInput.value.trim();
    if (q === '') { return; }
    var sUrl = 'https://api.themoviedb.org/3/search/movie' +
      '?api_key=' + API_KEY +
      '&query=' + encodeURIComponent(q) +
      '&language=ko-KR';
    fetch(sUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        showMovies(data.results);
      });
  };
};

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

