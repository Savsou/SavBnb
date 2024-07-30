const express = require('express');
const { Spot, Image, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const formatReviews = require('../../utils/formatReviews');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: {
            userId
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
        const spot = booking.Spot.toJSON();

        spot.previewImage = spot.previewImage.length > 0 ? spot.previewImage[0].url : null;
        return {
            id: booking.id,
            spotId: booking.spotId,
            Spot: spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
    });

    return res.json({ Bookings: formattedBookings })
})

module.exports = router;
