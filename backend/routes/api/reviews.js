const express = require('express');
const { Spot, Review, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const formatReviews = require('../../utils/formatReviews');

const router = express.Router();

const validateReview = [
    check('review')
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName',]
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: Image,
                        as: 'previewImage',
                        attributes: ['url'],
                        where: {
                            imageableType: 'Spot',
                            preview: true
                        },
                        required: false
                    }
                ]
            },
            {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id', 'url'],
                where: {
                    imageableType: 'Review'
                },
                required: false
            }
        ]
    });

    const formattedReviews = formatReviews(reviews);

    return res.json({ Reviews: formattedReviews });
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const userId = req.user.id;

    const review = await Review.findByPk(reviewId, {
        include: [
            {
                model: Image,
                as: 'ReviewImages'
            }
        ]
    });

    if (!review) {
        return res.status(404).json({message: "Review couldn't be found"})
    };

    if (review.userId !== userId) {
        return res.status(403).json({message: "Review does not belong to User"})
    };

    if (review.ReviewImages.length >= 10) {
        return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    };

    const newImage = await Image.create({
        imageableId: reviewId,
        imageableType: 'Review',
        url
    });

    return res.status(201).json({
        id: newImage.id,
        url: newImage.url
    })

})

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const editReview = await Review.findByPk(reviewId);

    if (!editReview) {
        return res.status(404).json({message: "Review couldn't be found"})
    }

    if (editReview.userId !== userId) {
        return res.status(403).json({message: "Review does not belong to the User"})
    };

    editReview.review = review;
    editReview.stars = stars;

    await editReview.save();

    return res.status(200).json(editReview);
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const deleteReview = await Review.findByPk(reviewId);

    if (!deleteReview) {
        return res.status(404).json({message: "Review couldn't be found"})
    }

    if (deleteReview.userId !== userId) {
        return res.status(403).json({message: "Review does not belong to the User"})
    }

    await deleteReview.destroy();

    return res.status(200).json({messaage: "Successfully deleted"})
})

module.exports = router;
