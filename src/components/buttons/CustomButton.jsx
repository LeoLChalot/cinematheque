export default function CustomButton({ text, onClick, className }) {
    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
}