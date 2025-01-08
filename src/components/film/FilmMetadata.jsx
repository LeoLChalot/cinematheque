export default function FilmMetadata({film}) {
    return (
        <div className='film-categories'>
            <p>{film.genres.map((genre) => genre.name).join(' - ')} <br />{film.release_date}</p>
        </div>

    );
}
