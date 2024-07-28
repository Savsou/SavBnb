const formatReviews = (reviews) => {
    return reviews.map(review => {
        const spot = review.Spot ? review.Spot.toJSON() : null;

        if (spot) {
            spot.previewImage = spot.previewImage && spot.previewImage.length > 0 ? spot.previewImage[0].url : null;
        }

        const formattedReview = {
            ...review.toJSON(),
            ReviewImages: review.ReviewImages
        }

        if (spot) {
            formattedReview.Spot = spot;
        }


        return formattedReview
    })
};

module.exports = formatReviews;
