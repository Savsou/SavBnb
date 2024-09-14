import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { fetchSpotById } from "../../store/spots";
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spot)
    const { closeModal } = useModal();

    useEffect(() => {
        if (spot) {
            dispatch(fetchSpotById(spot.id))
        }
    }, [dispatch, spot])

    const handleDelete = () => {
        dispatch(deleteReview(reviewId))
        closeModal();
    }

    return (
        <div className="modal-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="buttons-container">
                <button onClick={handleDelete} className="confirm">Yes (Delete Review)</button>
                <button onClick={closeModal} className="cancel">No (Keep Review)</button>
            </div>
        </div>
    )

}

export default DeleteReviewModal;
