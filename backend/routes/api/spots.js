const express = require('express');
const { Spot, Review, Image } = require('../../db/models');
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


module.exports = router;
