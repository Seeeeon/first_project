import React, {useState} from "react";
import Star from "./Star";
import '../../assets/css/reset.css'
import '../../assets/css/common.css'
import '../../assets/css/style.css'

export default function ReviewEdit ({ productid}) {
    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const review = { userid: 1, productid: productid, reviewtext: reviewText, starrating: starRating };

        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Review created:', data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <select value={starRating} onChange={(e) => setStarRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(star => (
                    <option key={star} value={star}>{star}</option>
                ))}
            </select>
            <button type="submit">Submit Review</button>
        </form>
    );
};