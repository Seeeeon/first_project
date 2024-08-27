import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Star({value, onChange}) {
    const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (newRating) => {
    setRating(newRating);
    onChange(newRating);
  };
    return (
        <>
            {[...Array(rating)].map((a, i) => (
                <i className="fa-solid fa-star" key={i} onClick={() => handleClick(i + 1)} />
            ))}
            {[...Array(5 - rating)].map((a, i) => (
                <i className="fa-regular fa-star" key={i} onClick={() => handleClick(rating + i + 1)} />
            ))}
        </>
    );
}
Star.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };