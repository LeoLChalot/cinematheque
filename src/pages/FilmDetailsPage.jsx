import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/ApiContext";
import FilmBackdrop from "../components/film/FilmBackdrop";
import NeonTitle from "../components/layouts/NeonTitle";
import FilmResume from "../components/film/FilmResume";
import FilmMetadata from "../components/film/FilmMetadata";
import Film from "../components/film/Film";
import CustomButton from "../components/buttons/CustomButton";

export default function FilmDetailsPage() {
    const api = useApi();
    const { id } = useParams();

    const [film, setFilm] = useState({});
    const [isAlreadyInList, setIsAlreadyInList] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchFilm = async (id) => {
        setLoading(true);
        await fetch(`${api.url}/${id}?language=fr-FR`, {
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

    const addToLocalStorage = (film) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        films.push(film);
        localStorage.setItem('films', JSON.stringify(films));
        setIsAlreadyInList(true);
    };

    const removeFromLocalStorage = (id) => {
        let films = JSON.parse(localStorage.getItem('films')) || [];
        films = films.filter((film) => film.id !== id);
        localStorage.setItem('films', JSON.stringify(films));
        setIsAlreadyInList(false);
    };

    useEffect(() => {
        fetchFilm(id);
        localStorageFilmFilter(film);
    }, [id]);

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
                        {
                            isAlreadyInList
                                ? <CustomButton text="Retirer de ma liste" onClick={() => removeFromLocalStorage(film.id)} />
                                : <CustomButton text="Ajouter à ma liste" onClick={() => addToLocalStorage(film)} />
                        }
                    </>
            }
        </div>
    );
}
