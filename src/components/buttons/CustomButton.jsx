import { useState } from 'react';

export default function CustomButton({ text, onClick, className }) {
    const [buttonText, setButtonText] = useState(text);

    const handleClick = () => {
        setButtonText('Loading...');
        onClick();
        setTimeout(() => {
            setButtonText(text);
        }, 1000); // Remet le texte original après 2 secondes
    };

    return (
        <button onClick={handleClick} className={`btn ${className}`}>
            {buttonText}
        </button>
    );
}