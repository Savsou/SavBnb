import { useEffect } from "react";
import { fetchMySpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../AllSpots/SpotTile";
import './ManageSpots.css';
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="spots-container">
            <h1>Manage Your Spots</h1>
            {mySpots && mySpots.length > 0 ? (
                <div className="my-spot-list">
                    {mySpots.map(spot => (
                        <div>
                            <SpotTile key={spot.id} spot={spot} />
                            <div className="update-delete-btn">
                                <button>Update</button>
                                <button>Delete</button>
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
