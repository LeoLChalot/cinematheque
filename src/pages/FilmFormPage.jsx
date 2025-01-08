import { useParams } from "react-router-dom"

export default function FilmFormPage(){

    const {id} = useParams() 

    return (
        <div>
            { id 
            ? <h1 className="neon neon-vert">Editer ce film</h1> 
            : <h1 className="neon neon-vert">Ajouter un nouveau film</h1> }
            { id 
            ? <p>Identifiant : {id}</p> 
            : null }
        </div>
    )
}