export default function FilmCard({ film }) {
    return (
        <div key={film.id} className='film-card'>
            <a className="film-link" href={`/film/${film.id}`}><img src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} alt={film.title} /></a>
            <div className="film-card-info">
                <h2 className="film-title">{film.title.slice(0, 30)}{film.title.length > 30 && "..."}</h2>
                {/* <p>{film.overview}</p> */}
            </div>
        </div>
    );
}