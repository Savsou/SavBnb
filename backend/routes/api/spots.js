const express = require('express');
const { Spot, Review, Image, User } = require('../../db/models');
const formatSpots = require('../../utils/formatSpots')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

const validateSpot = [
    check('address')
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .isFloat({min: -180, max: 180})
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .isLength({max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .isFloat({min: 0})
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

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

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const ownerId = req.user.id;

    const newSpot = await Spot.create( {
        ownerId,
        ...req.body
    })

    return res.json(newSpot);
})

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
                attributes: ['id', 'url', 'preview'],
                where: {imageableType: 'Spot'}
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
