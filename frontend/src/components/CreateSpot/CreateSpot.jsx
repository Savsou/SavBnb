import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";

import './CreateSpot.css'

const CreateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    const [imageFour, setImageFour] = useState('');
    const [errors, setErrors] = useState({});

    const updateName = (e) => setName (e.target.value);
    const updateAddress = (e) => setAddress (e.target.value);
    const updateCity = (e) => setCity (e.target.value);
    const updateState = (e) => setState (e.target.value);
    const updateCountry = (e) => setCountry (e.target.value);
    const updateLat = (e) => setLat (e.target.value);
    const updateLng = (e) => setLng (e.target.value);
    const updateDescription = (e) => setDescription (e.target.value);
    const updatePrice = (e) => setPrice (e.target.value);
    const updatePreviewImg = (e) => setPreviewImg(e.target.value);
    const updateImageOne = (e) => setImageOne(e.target.value);
    const updateImageTwo = (e) => setImageTwo(e.target.value);
    const updateImageThree = (e) => setImageThree(e.target.value);
    const updateImageFour = (e) => setImageFour(e.target.value);

    const validateUrl = (url) => {
        return url.toLowerCase().endsWith('.png') ||
               url.toLowerCase().endsWith('.jpg') ||
               url.toLowerCase().endsWith('.jpeg');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!country) newErrors.country = "Country is required";
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (description.length < 30) newErrors.description = "Description must be at least 30 characters";
        if (!name) newErrors.name = "Name is required";
        if (price <= 0) newErrors.price = "Price is required";
        if (!previewImg) newErrors.previewImg = "Preview image is required"
        if (previewImg && !validateUrl(previewImg)) newErrors.previewImg = "Preview Image URL must end in .png, .jpg, or .jpeg";

        if (!validateUrl(imageOne) && imageOne.length) newErrors.imageOne = "Image URL 1 must end in .png, .jpg, or .jpeg";
        if (!validateUrl(imageTwo) && imageTwo.length) newErrors.imageTwo = "Image URL 2 must end in .png, .jpg, or .jpeg";
        if (!validateUrl(imageThree) && imageThree.length) newErrors.imageThree = "Image URL 3 must end in .png, .jpg, or .jpeg";
        if (!validateUrl(imageFour) && imageFour.length) newErrors.imageFour = "Image URL 4 must end in .png, .jpg, or .jpeg";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let updatedLat = lat === '' ? 50 : parseFloat(lat);
        let updatedLng = lng === '' ? 100 : parseFloat(lng);
        let updatedPrice = parseFloat(price)

        let images = [
            {url: previewImg, preview: true},
            {url: imageOne, preview: false},
            {url: imageTwo, preview: false},
            {url: imageThree, preview: false},
            {url: imageFour, preview: false},
        ].filter(image => image.url)

        const payload = {
            name,
            address,
            city,
            state,
            country,
            lat: updatedLat,
            lng: updatedLng,
            description,
            price: updatedPrice,
            images
        };

        let createdSpot = await dispatch(createSpot(payload));
        if (createdSpot) {
            navigate(`/spots/${createdSpot.id}`);
        }
    }

    return (
        <section className="create-spot-holder">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
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
                        onChange={updateCountry} />
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
                        onChange={updateAddress} />
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
                        onChange={updateCity} />
                    </div>

                    <p className="comma">, </p>

                    <div className="state-wrapper">
                        <label>State {errors.state && <span className="error">{errors.state}</span>}</label>
                        <input
                        className="state"
                        type="text"
                        placeholder="STATE"
                        value={state}
                        onChange={updateState} />
                    </div>
                </div>

                <div className="lat-lng-wrapper">
                    <div className="lat-wrapper">
                        <label>Latitude</label>
                        <input
                        className="latitude"
                        type="number"
                        min="-90"
                        max="90"
                        placeholder="Latitude"
                        value={lat}
                        onChange={updateLat} />
                    </div>

                    <p className="comma">, </p>

                    <div className="lng-wrapper">
                        <label>Longitude</label>
                        <input
                        className="longitude"
                        type="number"
                        min="-180"
                        max="180"
                        placeholder="Longitude"
                        value={lng}
                        onChange={updateLng} />
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
                    onChange={updateDescription} />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className="spot-name-section">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={updateName} />
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
                        onChange={updatePrice} />
                    </div>
                        {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="image-section">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImg}
                    onChange={updatePreviewImg} />
                    {errors.previewImg && <p className="error">{errors.previewImg}</p>}
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={imageOne}
                    onChange={updateImageOne}
                    />
                    {errors.imageOne && <p className="error">{errors.imageOne}</p>}
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={imageTwo}
                    onChange={updateImageTwo}
                    />
                    {errors.imageTwo && <p className="error">{errors.imageTwo}</p>}
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={imageThree}
                    onChange={updateImageThree}
                    />
                    {errors.imageThree && <p className="error">{errors.imageThree}</p>}
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={imageFour}
                    onChange={updateImageFour}
                    />
                    {errors.imageFour && <p className="error">{errors.imageFour}</p>}
                </div>

                <div className="submit-button">
                    <button type="submit">Create Spot</button>
                </div>
            </form>
        </section>
    )
}

export default CreateSpot;
