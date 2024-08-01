const express = require('express');
const { Spot, Image, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const router = express.Router();

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
                required: false
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

router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({message: "Booking couldn't be found"})
    }

    if (booking.userId !== userId) {
        return res.status(403).json({message: "Booking does not belong to the User"})
    }

    const conflictBooking = await Booking.findOne({
        where: {
            id: booking.spotId,
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

    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save();

    return res.status(200).json(booking);
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({message: "Booking couldn't be found"})
    }

    if (booking.userId !== userId) {
        return res.status(403).json({message: "Booking does not belong to User"})
    }

    const nowDate = new Date();

    if (booking.startDate <= nowDate) {
        return res.status(403).json({message: "Bookings that have been started can't be deleted"})
    }

    await booking.destroy();

    return res.status(200).json({message: "Successfully deleted"});
})

module.exports = router;
