import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/ApiContext";
import FilmBackdrop from "../components/film/FilmBackdrop";
import NeonTitle from "../components/layouts/NeonTitle";
import FilmResume from "../components/film/FilmResume";
import FilmMetadata from "../components/film/FilmMetadata";
import Film from "../components/film/Film";
import CustomButton from "../components/buttons/CustomButton";
import StarRating from "../components/buttons/StarRating";

export default function FilmDetailsPage() {
    const api = useApi();
    const { id } = useParams();

    const [film, setFilm] = useState(null);
    const [isAlreadyInList, setIsAlreadyInList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const fetchFilm = async (id) => {
        setLoading(true);
        await fetch(`${api.url}/movie/${id}?language=fr-FR`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${api.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setFilm(data);
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            });
    };

    const localStorageFilmFilter = (film) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        setIsAlreadyInList(films.some((f) => f.id === film.id));
        return films.some((f) => f.id === film.id);
    };

    const saveFilmToLocalStorage = (film, comment, rating) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        let filmIndex = films.findIndex((f) => f.id === film.id);
        if (filmIndex !== -1) {
            films[filmIndex].comment = comment;
            films[filmIndex].rating = rating;
        } else {
            film.comment = comment;
            film.rating = rating;
            films.push(film);
        }
        localStorage.setItem('films', JSON.stringify(films));
        setIsAlreadyInList(true);
        setComment(comment);
        setRating(rating);
    };

    const removeFilmFromLocalStorage = (id) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        films = films.filter((film) => film.id !== id);
        localStorage.setItem('films', JSON.stringify(films));
        setIsAlreadyInList(false);
        setComment(''); 
        setRating(0); 
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const loadCommentFromLocalStorage = (film) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        let filmData = films.find((f) => f.id === film.id);
        if (filmData && filmData.comment) {
            setComment(filmData.comment);
        }
    };
    
    const loadRatingFromLocalStorage = (film) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        let filmData = films.find((f) => f.id === film.id);
        if (filmData && filmData.rating) {
            setRating(filmData.rating);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        fetchFilm(id);
    }, [id]);

    useEffect(() => {
        if (film) {
            localStorageFilmFilter(film);
            loadRatingFromLocalStorage(film);
            loadCommentFromLocalStorage(film);
        }
    }, [isAlreadyInList, film]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="film-details"></div>
            {
                loading
                    ? <p className="loading-text">Chargement...</p>
                    :
                    <>
                        <Film>
                            <NeonTitle title={film.title} color="bleu" />
                            <FilmBackdrop film={film} />
                            <FilmMetadata film={film} />
                            <FilmResume film={film} />
                        </Film>
                        <div className="comment-section">
                            {
                                isAlreadyInList & comment != "" ? <p>Commentaire enregistré !</p> : null
                            }

  
                            <StarRating rating={rating} onRate={handleRatingChange} />
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Ajouter une note personnelle"
                            />
                        </div>
                        {
                            isAlreadyInList
                                ? <CustomButton text="Retirer de ma liste" onClick={() => removeFilmFromLocalStorage(film.id)} />
                                : <CustomButton text="Ajouter à ma liste" onClick={() => saveFilmToLocalStorage(film, comment)} />
                        }
                    </>
            }
        </div>
    );
}