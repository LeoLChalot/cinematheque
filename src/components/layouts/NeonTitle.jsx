export default function NeonTitle({title, color}){
    return (
        <h1 className={`neon neon-${color}`}>{title}</h1>
    )
}