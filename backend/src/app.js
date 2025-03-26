require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models'); // подключаем модели, включая User

// Импорт роутов авторизации
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use('/auth', authRoutes);

// Простой маршрут
app.get('/', (req, res) => {
  res.send('Glazok backend is running');
});

// Тестовый маршрут для создания пользователя (vk_12345) без дублирования
app.get('/test-create-user', async (req, res) => {
  try {
    const alreadyUser = await User.findOne({ where: { vk_id: 'vk_12345' } });
    if (!alreadyUser) {
      const newUser = await User.create({
        vk_id: 'vk_12345',
        is_premium: false,
        source_reason: 'Ревную вторую половинку',
      });
      return res.json(newUser);
    }
    return res.send('User vk_12345 already exists');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при создании пользователя');
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  try {
    // Тестируем соединение с БД
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Синхронизируем модели (создаёт или обновляет таблицы)
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});




