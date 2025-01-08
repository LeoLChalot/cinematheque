import { useParams } from "react-router-dom"

export default function FilmDetailsPage() {

    const { id } = useParams()

    return (
        <div>
            <h1 className="neon neon-bleu">Film Details Page</h1>

            {id
                ? <p>Détail du film : {id}</p>
                : (
                    <>
                        <p>Aucun film n'a été trouvé !</p>
                        <a href="/films">Retour à la liste des films</a>
                    </>
                )}
        </div>
    )
}