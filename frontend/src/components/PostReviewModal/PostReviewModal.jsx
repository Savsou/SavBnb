import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";
import './PostReviewModal.css';

const PostReviewModal = ({ spotId }) => {
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

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
                    <input
                    type="number"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)} />
                    <label htmlFor="">Stars</label>
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
