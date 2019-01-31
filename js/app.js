$(document).ready(() =>{

	$('#axtarmaq').on('submit', (e) => {

		var metnYazmaq = $('#metnYazmaq').val();
		getFilmler(metnYazmaq);
		e.preventDefault();
	});

});

function  getFilmler(metnYazmaq) {

	axios.get('http://www.omdbapi.com/?s='+metnYazmaq + '&apikey=9be27fce').then((response) => {

	 	console.log(response);
	 	var filmler =response.data.Search;
	 	var gorsendi = '';
	 	$.each(filmler, (index,film) => {

	 		gorsendi +=` 
	 		    <div class = "col-md-3">
	 		        <div class = "yaxsi text-center">
	 		            <img src = "${film.Poster}">
	 		            <h5>${film.Title}</h5>
	 		             <a onclick="filmSecildi('${film.imdbID}')" class="btn btn-primary" href="#">Film Detalları</a>
	 		        </div>
	 		    </div>
            `;

	 	});

	 	$('#filmler').html(gorsendi);
	 })

	 .catch((err) => {

	 	console.log(err);


	 });
	
}

function filmSecildi(id){

	sessionStorage.setItem('filmId', id);
	window.location = 'film.html';
	return false;
}

function getFilm(){

	var filmId = sessionStorage.getItem('filmId');


	axios.get('http://www.omdbapi.com/?i='+filmId+'&apikey=9be27fce').then((response) => {

	 	
	 	var film = response.data;
	 	console.log(film);
	 	var gorsendi= `

	 	    <div class="row">
	 	        <div class="col-md-4">
	 	           <img src ="${film.Poster}" class="thumbnail">
	 	        </div>
	 	        <div class="col-md-8">
	 	          <h2>${film.Title}</h2>
	 	            <ul class="list-group">
	 	                <li class="list-group-item"><strong>Genre:</strong>${film.Genre}</li>
	 	                <li class="list-group-item"><strong>Released:</strong>${film.Released}</li>
	 	                <li class="list-group-item"><strong>Rated:</strong>${film.Rated}</li>
	 	                <li class="list-group-item"><strong>IMDB Rating:</strong>${film.imdbRating}</li>
	 	                <li class="list-group-item"><strong>Director:</strong>${film.Director}</li>
	 	                <li class="list-group-item"><strong>Writer:</strong>${film.Writer}</li>
	 	                <li class="list-group-item"><strong>Actors:</strong>${film.Actors}</li>
	 	            </ul>
	 	        </div>
	 	    </div>
	 	    <div class="row">

	 	        <div class="yaxsi">
	 	           <h3>Plot</h3>
	 	           ${film.Plot}

	 	           <hr>
	 	           <a href="http://imdb.com/title/${film.imdbID}" target="_blank" class="btn btn-primary">Bax IMDB
	 	           </a>
	 	           <a href="index.html" class="btn btn-default">Axtarışa Geri Dön</a>

	 	        </div>
	 	    </div>
	 	 `;

	 	document.querySelector('#film').innerHTML = gorsendi;
	 })

	 .catch((err) => {

	 	console.log(err);


	 });
}