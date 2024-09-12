import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import './DeleteModal.css'

const DeleteModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteSpot(spotId))
        closeModal();
    }

    return (
        <div className="modal-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div className="buttons-container">
                <button onClick={handleDelete} className="confirm">Yes (Delete Spot)</button>
                <button onClick={closeModal} className="cancel">No (Keep Spot)</button>
            </div>
        </div>
    )

}

export default DeleteModal;
