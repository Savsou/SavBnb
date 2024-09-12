import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotById, updateSpot } from "../../store/spots";

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spot = useSelector((state) => state.spots.spot)

    useEffect(() => {
        dispatch(fetchSpotById(spotId));
    }, [dispatch, spotId])

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState(spot?.city || '');
    const [stateValue, setStateValue] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (spot) {
            setName(spot.name || '');
            setAddress(spot.address || '');
            setCity(spot.city || '');
            setStateValue(spot.state || '');
            setCountry(spot.country || '');
            setLat(spot.lat || '');
            setLng(spot.lng || '');
            setDescription(spot.description || '');
            setPrice(spot.price || '');
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!country) newErrors.country = "Country is required";
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!stateValue) newErrors.state = "State is required";
        if (description.length < 30) newErrors.description = "Description must be at least 30 characters";
        if (!name) newErrors.name = "Name is required";
        if (price <= 0) newErrors.price = "Price is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let updatedLat = lat === '' ? 50 : parseFloat(lat);
        let updatedLng = lng === '' ? 100 : parseFloat(lng);
        let updatedPrice = parseFloat(price)

        const payload = {
            name,
            address,
            city,
            state: stateValue,
            country,
            lat: updatedLat,
            lng: updatedLng,
            description,
            price: updatedPrice,
        };

        let updatedSpot = await dispatch(updateSpot(spotId, payload));
        if (updatedSpot) {
            navigate(`/spots/${updatedSpot.id}`);
        }
    }

    return (
        <section className="create-spot-holder">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h1>Update your Spot</h1>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a
                reservation.</p>

                <label>
                    Country
                    {errors.country && <span className="error">{errors.country}</span>}
                    <div>
                        <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </label>

                <label>
                    Street Address
                    {errors.address && <span className="error">{errors.address}</span>}
                    <div>
                        <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </label>

                <div className="city-state-wrapper">
                    <div className="city-wrapper">
                        <label>
                            City {errors.city && <span className="error">{errors.city}</span>}
                        </label>

                        <input
                        className="city"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <p className="comma">, </p>

                    <div className="state-wrapper">
                        <label>State {errors.state && <span className="error">{errors.state}</span>}</label>
                        <input
                        className="state"
                        type="text"
                        placeholder="STATE"
                        value={stateValue}
                        onChange={(e) => setStateValue(e.target.value)} />
                    </div>
                </div>

                <div className="lat-lng-wrapper">
                    <div className="lat-wrapper">
                        <label>Latitude</label>
                        <input
                        className="latitude"
                        type="number"
                        step="0.000001"
                        min="-90"
                        max="90"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)} />
                    </div>

                    <p className="comma">, </p>

                    <div className="lng-wrapper">
                        <label>Longitude</label>
                        <input
                        className="longitude"
                        type="number"
                        step="0.000001"
                        min="-180"
                        max="180"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)} />
                    </div>
                </div>

                <div className="description-section">
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

                    <textarea
                    className="description-input"
                    placeholder="Please write at least 30 characters"
                    minLength="30"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className="spot-name-section">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="price-section">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div className="price-wrap">
                        <span className="money-sign">$</span>
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                    </div>
                        {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="submit-button">
                    <button type="submit">Update Spot</button>
                </div>
            </form>
        </section>
    )
}

export default UpdateSpot;
