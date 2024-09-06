const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.')
      .custom(async (email) => {
        const existingUserByEmail = await User.findOne({ where: { email } });
        if (existingUserByEmail) {
            throw new Error('The provided email is already in use.');
        }
      }),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.')
      .custom(async (username) => {
        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            throw new Error('Username must be unique.');
        }
    }),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true})
      .withMessage('Please provide a first name.'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Please provide a last name.'),
    handleValidationErrors
];

router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword, firstName, lastName });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});

module.exports = router;
