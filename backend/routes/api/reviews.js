const express = require('express');
const { Spot, Review, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const formatReviews = require('../../utils/formatReviews');

const router = express.Router();

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
                            imageableType: 'Spot'
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

module.exports = router;
