import { useEffect } from "react";
import { fetchMySpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../AllSpots/SpotTile";
import './ManageSpots.css';
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal/DeleteModal";

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mySpots = useSelector((state) => state.spots.mySpots)
    console.log("My Spots here", mySpots)

    useEffect(() => {
        dispatch(fetchMySpots());
    }, [dispatch])

    const newSpot = (e) => {
        e.preventDefault();

        navigate('/spots/new')
    }

    const handleUpdate = (spotId) => {
        navigate(`/spots/${spotId}/edit`)
    }

    return (
        <div className="spots-container">
            <h1>Manage Your Spots</h1>
            {mySpots && mySpots.length > 0 ? (
                <div className="my-spot-list">
                    {mySpots.map(spot => (
                        <div key={spot.id}>
                            <SpotTile spot={spot} />
                            <div className="update-delete-btn">
                                <button onClick={() => handleUpdate(spot.id)}>Update</button>
                                <OpenModalButton buttonText="Delete" modalComponent={<DeleteModal spotId={spot.id}/>} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <button onClick={newSpot} className="create-spot-button">Create a New Spot</button>
            )}
        </div>
    );
}

export default ManageSpots;
