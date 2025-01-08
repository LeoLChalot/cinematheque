export default function FilmResume({ film }) {
    return (
        <div className="film-resume">
            <p>{film.overview}</p>
        </div>
    );
}