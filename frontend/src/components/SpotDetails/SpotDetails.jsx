import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotById } from "../../store/spots";
import { fetchReviewsSpotById } from "../../store/reviews";
import { LiaStarSolid } from "react-icons/lia";
import './SpotDetails.css'
import ReviewList from "../Reviews";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spot)
    const spotReviews = useSelector((state) => state.reviews.spotReviews)

    console.log("This is spot", spot);
    console.log("This is the reviews by spot", spotReviews)

    useEffect(() => {
        if (spotId) {
            dispatch(fetchSpotById(spotId))
        }
    }, [dispatch, spotId])

    useEffect(() => {
        if (spotId) {
            dispatch(fetchReviewsSpotById(spotId))
        }
    }, [dispatch, spotId])


    if (!spot) return <p>Loading...</p>

    let numReviews;
    if (!spot.numReviews || spot.numReviews === 0) {
        numReviews = <span>New</span>
    } else if (spot.numReviews === 1) {
        numReviews = <span>{spot.avgStarRating} - 1 review</span>
    } else {
        numReviews = <span>{spot.numReviews} reviews</span>
    }

    let previewImage = spot.SpotImages?.find((image) => image.preview)?.url || "https://rankenjordan.org/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png";

    return (
        <div className="spot-details-container">
            <div className="spot-details">
                <h1>{spot.name}</h1>
                <p className="location">{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-details-images">
                    <div className="preview-image">
                        <img src={previewImage} alt="" />
                    </div>
                    <div className="smaller-images">
                        {spot.SpotImages.slice(1, 5).map((image, idx) => (
                            <img key={idx} src={image.url} alt={`Image ${idx}`} />
                        ))}
                    </div>
                </div>
                <div className="spot-details-info">
                    <div className="info">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className="callout-box">
                        <div className="callout-box-info">
                            <p className="price-info">
                                <span className="price">${spot.price}</span>
                                <span> night</span>
                            </p>
                            <div className="reviews">
                                <span><LiaStarSolid /> {numReviews}</span>
                            </div>
                        </div>
                        <button onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="reviews-container">
                <h2><LiaStarSolid /> {numReviews}</h2>
                <ReviewList reviews={spotReviews}/>
            </div>
        </div>
    )
}

export default SpotDetails;
