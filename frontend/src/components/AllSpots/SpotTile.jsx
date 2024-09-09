import { Link } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";
import './SpotTile.css'

const SpotTile = ({ spot }) => {
    const {id, name, city, state, price, avgRating, previewImage } = spot;
    const rating = avgRating ? avgRating : 'New';

    const defaultImg = "https://rankenjordan.org/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png"
    const imageSrc = previewImage ? previewImage : defaultImg;

    return (
        <Link to={`/spots/${id}`} className="spot-tile">
            <div className="spot-image">
                <img src={imageSrc} alt={name} title={name} />
            </div>
            <div className="spot-info">
                <p className="location">{city}, {state}</p>
                <p className="rating"><LiaStarSolid /> {rating}</p>
            </div>
            <p className="price">${price} night</p>
        </Link>
    )
}

export default SpotTile;
