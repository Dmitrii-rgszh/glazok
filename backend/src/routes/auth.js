const router = require('express').Router();
const axios = require('axios');
const { User } = require('../models'); // твоя модель

router.get('/vk/start', (req, res) => {
  const { VK_CLIENT_ID, VK_REDIRECT_URI } = process.env;
  const scope = 'email'; // какие права запрашиваем
  const apiVersion = '5.131';

  // Сформировать ссылку на авторизацию
  const authUrl = `https://oauth.vk.com/authorize?client_id=53333212&redirect_uri=https://glazok.onrender.com/auth/vk/callback&scope=email&response_type=code&v=5.131`;
  res.redirect(authUrl);

router.get('/vk/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code');

  const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URI } = process.env;
  try {
    // Обмен кода на токен
    const tokenResponse = await axios.get('https://oauth.vk.com/access_token', {
      params: {
        client_id: VK_CLIENT_ID,
        client_secret: VK_CLIENT_SECRET,
        redirect_uri: VK_REDIRECT_URI,
        code,
      },
    });

    const { access_token, user_id, email } = tokenResponse.data;

    // Найти или создать пользователя в БД
    let user = await User.findOne({ where: { vk_id: user_id.toString() } });
    if (!user) {
      user = await User.create({
        vk_id: user_id.toString(),
        email: email || '',
        // ...
      });
    }

    // Тут можно сохранить JWT в куках или просто сообщить, что авторизация успешна
    return res.send(`Вы авторизованы. vk_id = ${user_id}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Ошибка при авторизации');
  }
});

module.exports = router;


