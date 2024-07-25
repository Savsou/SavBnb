const express = require('express');
const { Spot, Review, Image, User } = require('../../db/models');
const formatSpots = require('../../utils/formatSpots')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/', async (req, res) => {
    const spots =  await Spot.findAll({
        include: [
            { model: Review },
            { model: Image }
        ]
    });

    const formattedSpots = formatSpots(spots);

    return res.status(200).json({ Spots: formattedSpots });
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            { model: Review },
            { model: Image }
        ]
    });

    const formattedSpots = formatSpots(spots);

    return res.json({ Spots: formattedSpots });
})

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Image,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
    });

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const reviews = await Review.findAll({
        where: { spotId },
        attributes: ['stars']
    });

    const numReviews = reviews.length;
    const avgStarRating = numReviews > 0 ? reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews : 0;

    const formattedSpot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews,
        avgStarRating: avgStarRating.toFixed(1),
        SpotImages: spot.Images,
        Owner: spot.User
    };

    return res.json(formattedSpot);
})


module.exports = router;
