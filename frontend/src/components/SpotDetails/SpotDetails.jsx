import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotById } from "../../store/spots";
import { LiaStarSolid } from "react-icons/lia";
import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spot)

    console.log("This is spot", spot);

    let previewImage = spot.SpotImages.find((image) => image.preview).url || "https://rankenjordan.org/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png";

    useEffect(() => {
        if (spotId) {
            dispatch(fetchSpotById(spotId))
        }
    }, [dispatch, spotId])

    if (!spot) return <p>Loading...</p>

    return (
        <div className="spot-details-container">
            <div className="spot-details">
                <h1>{spot.name}</h1>
                <p className="location">{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-details-images">
                    <div className="preview-image">
                        <img src={previewImage} alt="" />
                    </div>
                    <div className="other-images">
                        {spot.SpotImages.slice(1, 5).map((image, idx) => (
                            <img key={idx} src={image.url} alt={`Image ${idx}`} />
                        ))}
                    </div>
                </div>
                <div className="spot-details-info">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                    <div className="callout-box">
                        <div className="callout-box-info">
                            <p>${spot.price} night</p>
                            <p><LiaStarSolid />{spot.avgStarRating} - {spot.numReviews} reviews</p>
                        </div>
                        <button onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;
