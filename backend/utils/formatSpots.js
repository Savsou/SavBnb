const formatSpots = (spots) => {
    return spots.map(spot => {
        const spotJson = spot.toJSON();

        const reviews = spotJson.Reviews;
        const avgRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length : null;

        const previewImage = spotJson.previewImage && spotJson.previewImage.length > 0 ? spotJson.previewImage[0].url : null;

        return {
            id: spotJson.id,
            ownerId: spotJson.ownerId,
            address: spotJson.address,
            city: spotJson.city,
            state: spotJson.state,
            country: spotJson.country,
            lat: spotJson.lat,
            lng: spotJson.lng,
            name: spotJson.name,
            description: spotJson.description,
            price: spotJson.price,
            createdAt: spotJson.createdAt,
            updatedAt: spotJson.updatedAt,
            avgRating: avgRating.toFixed(1),
            previewImage
        }
    });
}

module.exports = formatSpots
