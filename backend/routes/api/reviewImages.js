const express = require('express');
const { Review, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;

    const reviewImage = await Image.findOne({
        where: {
            id: imageId,
            imageableType: 'Review'
        }
    })

    if (!reviewImage) {
        return res.status(404).json({message: "Review Image couldn't be found"})
    }

    const review = await Review.findOne({
        where: {
            id: reviewImage.imageableId,
            userId
        }
    });

    if (!review) {
        return res.status(403).json({message: "Review does not belong to User"})
    }

    await reviewImage.destroy();

    return res.status(200).json({message: "Successfully deleted"})
})

module.exports = router;
