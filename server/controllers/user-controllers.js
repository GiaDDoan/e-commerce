require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const client = new OAuth2Client(
  '904866829945-parp58ommnnc2c3r63euaod7m4s3jt28.apps.googleusercontent.com'
);

const google_login = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        '904866829945-parp58ommnnc2c3r63euaod7m4s3jt28.apps.googleusercontent.com',
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: 'Something went wrong...',
            });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: '7d' }
              );
              const { _id, name, email } = user;

              res.json({
                token,
                user: { _id, name, email },
              });
            } else {
              let password = email + process.env.JWT_SIGNIN_KEY;
              let newUser = new User({ name, email, password });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: 'Something went wrong...',
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: '7d' }
                );
                const { _id, name, email } = newUser;

                res.json({
                  token,
                  user: { _id, name, email },
                });
              });
            }
          }
        });
      }
    });
};

module.exports = {
  google_login,
};
