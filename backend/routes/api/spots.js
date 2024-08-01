const express = require('express');
const { Spot, Review, Image, User, Booking } = require('../../db/models');
const formatSpots = require('../../utils/formatSpots')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { check, query } = require('express-validator');
const formatReviews = require('../../utils/formatReviews');
const { Op } = require('sequelize');

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

const validateReview = [
    check('review')
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateBooking = [
    check('startDate')
        .notEmpty()
        .isDate()
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error("startDate cannot be in the past")
            }
            return true;
        }),
    check('endDate')
        .notEmpty()
        .isDate()
        .custom((value, {req}) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error("endDate cannot be on or before startDate")
            }
            return true;
        }),
    handleValidationErrors
]

const validateQueries = [
    query('page')
        .optional()
        .isInt({min: 1, max: 10})
        .withMessage("Page must be greater than or equal to 1"),
    query('size')
        .optional()
        .isInt({min: 1, max: 20})
        .withMessage("Size must be greater than or equal to 1"),
    query('minLat')
        .optional()
        .isFloat()
        .withMessage("Minimum latitude is invalid"),
    query('maxLat')
        .optional()
        .isFloat()
        .withMessage("Maximum latitude is invalid"),
    query('minLng')
        .optional()
        .isFloat()
        .withMessage("Minimum longitude is invalid"),
    query('maxLng')
        .optional()
        .isFloat()
        .withMessage("Maximum longitude is invalid"),
    query('minPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]

router.get('/', validateQueries, async (req, res) => {
    const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const where = {};

    if (minLat !== undefined) where.lat = { [Op.gte]: minLat };
    if (maxLat !== undefined) where.lat = { ...where.lat, [Op.lte]: maxLat };
    if (minLng !== undefined) where.lng = { [Op.gte]: minLng };
    if (maxLng !== undefined) where.lng = { ...where.lng, [Op.lte]: maxLng };
    if (minPrice !== undefined) where.price = { [Op.gte]: minPrice };
    if (maxPrice !== undefined) where.price = { ...where.price, [Op.lte]: maxPrice };

    const spots =  await Spot.findAll({
        where,
        include: [
            { model: Review },
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
        ],
        limit: parseInt(size),
        offset: parseInt(size * (page - 1))
    });

    const formattedSpots = formatSpots(spots);

    return res.status(200).json({ Spots: formattedSpots, page, size });
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
    });

    const formattedSpots = formatSpots(spots);

    return res.json({ Spots: formattedSpots });
})

router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const { firstName, lastName } = req.user;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"});
    }

    const isOwner = spot.ownerId === userId;

    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: {
                model: Image,
                as: 'previewImage',
                where: {preview: true},
                attributes: ['url'],
            }
        }
    });

    const formattedBookings = bookings.map(booking => {
        const bookingJson = booking.toJSON();

        if (!isOwner) {
            return {
                spotId: bookingJson.spotId,
                startDate: bookingJson.startDate,
                endDate: bookingJson.endDate
            }
        } else {
            return {
                User: {
                    id: userId,
                    firstName,
                    lastName
                },
                id: bookingJson.id,
                spotId: bookingJson.spotId,
                userId: bookingJson.userId,
                startDate: bookingJson.startDate,
                endDate: bookingJson.endDate,
                createdAt: bookingJson.createdAt,
                updatedAt: bookingJson.updatedAt
            }
        }
    });

    return res.json({ Bookings: formattedBookings })
})

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    if (spot.ownerId === userId) {
        return res.status(403).json({message: "User cannot book their own spot"})
    }

    const conflictBooking = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } },
                {
                    [Op.and]: [
                        { startDate: { [Op.lte]: startDate } },
                        { endDate: { [Op.gte]: endDate } }
                    ]
                }
            ]
        }
    });

    if (conflictBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    });

    return res.status(201).json({
        id: newBooking.id,
        spotId: newBooking.spotId,
        userId: newBooking.userId,
        startDate: newBooking.startDate,
        endDate: newBooking.endDate,
        createdAt: newBooking.createdAt,
        updatedAt: newBooking.updatedAt
    });

})

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName',]
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

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    const findReview = await Review.findAll({
        where: {
            userId,
            spotId
        }
    });

    if (findReview > 0) {
        return res.status(500).json({message: "User already has a review for this spot"})
    }

    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    });

    return res.json(newReview);
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    if (spot.ownerId !== userId) {
        return res.status(403).json({message: "Spot is not owned by user"})
    };

    const newImage = await Image.create({
        imageableId: spotId,
        imageableType: 'Spot',
        url,
        preview
    });

    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    });
})

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Image,
                attributes: ['id', 'url', 'preview'],
                as: 'previewImage',
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
        SpotImages: spot.previewImage,
        Owner: spot.User
    };

    return res.json(formattedSpot);
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    if (spot.ownerId !== userId) {
        return res.status(403).json({message: "Spot is not owned by user"})
    };

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    return res.json(spot);
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    if (spot.ownerId !== userId) {
        return res.status(403).json({message: "Spot is not owned by user"})
    };

    await Spot.destroy({
        where: {
            id: spotId,
            ownerId: userId
        }
    });

    return res.json({message: "Successfully deleted"})
})


module.exports = router;
