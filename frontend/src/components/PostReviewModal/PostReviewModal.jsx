import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";
import { fetchSpotById } from "../../store/spots";
import { FaStar } from "react-icons/fa6";
import './PostReviewModal.css';

const PostReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spot)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [hover, setHover] = useState(null);
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        if (spot) {
            dispatch(fetchSpotById(spot.id))
        }
    }, [dispatch, spot])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {review, stars}
        setErrors({})

        dispatch(postReview(spotId, reviewData))
        .then(() => {
            closeModal();
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
    }

    return (
        <div className="modal-container">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit} className="review-modal-container">
                <div className="error-container">
                    {Object.values(errors).map((error, idx) => (
                        <p key={idx} className="error-msg">{error}</p>
                    ))}
                </div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..." />

                <div className="stars-wrapper">
                    <div className="stars-container">
                        {[...Array(5)].map((star, idx) => {
                            const currentRating = idx + 1;

                            return (
                                <label key={idx}>
                                    <input
                                    type="radio"
                                    value={currentRating}
                                    onClick={(e) => setStars(Number(e.target.value))} />
                                    <FaStar
                                    className="star"
                                    size={30}
                                    color={currentRating <= (hover || stars) ? "#ffdf00" : "black"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}/>
                                </label>
                            );
                        })}
                    </div>
                    <p>Stars</p>
                </div>
                <button
                type="submit"
                disabled={review.length < 10 || stars < 1 || stars > 5 }
                >Submit Your Review</button>
            </form>
        </div>
    )
}

export default PostReviewModal;
