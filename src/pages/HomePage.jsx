import { useEffect, useState } from 'react';
import { useApi } from '../hooks/ApiContext';
import FilmCard from '../components/film/FilmCard';
import ItemContainer from '../components/layouts/ItemsContainer';
import NeonTitle from '../components/layouts/NeonTitle';
import { useLocation } from 'react-router-dom';
import { useApp } from '../hooks/AppContext';



export default function HomePage() {
    const api = useApi()
    const PageTitle = "Les films les plus appréciés du moment"

    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPopularFilms = async () => {
        setLoading(true)
        await fetch(`${api.url}/popular?language=fr-FR`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${api.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setFilms(data.results.slice(0, 10))
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            })
    }

    useEffect(() => {
        fetchPopularFilms()
    }, [])

    return (
        <>
            <NeonTitle title={PageTitle} color="rouge" />
            {loading && <p className="loading-text">Chargement...</p>}
            <ItemContainer>
                {!loading && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </ItemContainer>
        </>
    )
}
