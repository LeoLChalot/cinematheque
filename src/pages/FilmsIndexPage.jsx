import { useEffect, useState } from 'react';
import FilmCard from '../components/film/FilmCard';
export default function FilmsIndexPage() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const storedFilms = JSON.parse(localStorage.getItem('films')) || [];
        setFilms(storedFilms);
    }, []);

    return (
        <>
            <div>
                <h1 className="neon neon-bleu">Ma cinémathèque</h1>
                {films.map((film, index) => (
                    <FilmCard key={index} film={film} />
                ))}
            </div>
        </>
    );
}