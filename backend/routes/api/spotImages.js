const express = require('express');
const { Spot, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;

    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'Spot'
        }
    })

    if (!image) {
        return res.status(404).json({message: "Spot Image couldn't be found"})
    }

    const spot = await Spot.findOne({
        where: {
            id: image.imageableId,
            ownerId: userId
        }
    });

    if (!spot) {
        return res.status(403).json({message: "Spot does not belong to User"})
    }

    await image.destroy();

    return res.status(200).json({message: "Successfully deleted"})
})

module.exports = router;
