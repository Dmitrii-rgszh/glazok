const router = require('express').Router();
const axios = require('axios');
const { User } = require('../models');

router.get('/vk/start', (req, res) => {
  const { VK_CLIENT_ID, VK_REDIRECT_URI } = process.env;
  const scope = 'email';
  const apiVersion = '5.131';

  const url = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URI}&scope=${scope}&response_type=code&v=${apiVersion}`;
  res.redirect(url);
});

router.get('/vk/callback', async (req, res) => {
  const code = req.query.code;
  // ...
});

module.exports = router;

