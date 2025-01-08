import { useState, useEffect } from "react";
import { useApi } from "../hooks/ApiContext";
import FilmCard from "../components/film/FilmCard";
import ItemContainer from "../components/layouts/ItemsContainer";

export default function FilmSearch() {
    const api = useApi();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }
        setLoading(true);
        await fetch(`${api.url}/search/movie?query=${query}&language=fr-FR`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${api.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setResults(data.results || []); // Assurez-vous que les résultats sont correctement extraits
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(search);
        }, 300); // Ajoutez un délai pour éviter les appels API excessifs

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un film"
            />
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ItemContainer>
                    {results.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))}
                </ItemContainer>

            )}
        </div>
    );
}
