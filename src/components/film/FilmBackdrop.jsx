export default function FilmBackdrop({ film }) {
    return (
        <div className='film-backdrop'>
            <img src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`} alt={film.title} />
        </div>
    );
}