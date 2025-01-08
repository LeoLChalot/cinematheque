import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onClick = f => f }) => (
    <FaStar color={selected ? 'gold' : 'grey'} onClick={onClick} />
);

export default function StarRating({ totalStars = 5, selectedStars = 0, onRatingChange = f => f }) {
    return (
        <div>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={i < selectedStars}
                    onClick={() => onRatingChange(i + 1)}
                />
            ))}
            <p>
                {selectedStars} sur {totalStars} étoiles
            </p>
        </div>
    );
}