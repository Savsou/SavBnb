const formatReviews = (reviews) => {
    return reviews.map(review => {
        const spot = review.Spot.toJSON();
        spot.previewImage = spot.previewImage ? spot.previewImage.url : null;
        return {
            ...review.toJSON(),
            Spot: spot,
            ReviewImages: review.ReviewImages
        }
    })
};

module.exports = formatReviews;
