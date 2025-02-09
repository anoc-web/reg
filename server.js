const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://anoccon:NYPGlEj8wt4A3vyM@cluster0.hbl29.mongodb.net/bitacora?retryWrites=true&w=majority', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error al conectar con MongoDB', err));

app.use(cors());
app.use(express.json());

// Esquema de usuario
const userSchema = new mongoose.Schema({
  secretWord: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Registro de usuario
app.post('/register', async (req, res) => {
  const { secretWord } = req.body;

  if (!secretWord || secretWord.length > 100) {
    return res.status(400).json({ message: 'La palabra secreta debe tener máximo 100 caracteres.' });
  }

  const existingUser = await User.findOne({ secretWord });
  if (existingUser) {
    return res.status(400).json({ message: 'Esta palabra secreta ya está registrada.' });
  }

  const newUser = new User({ secretWord });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro del usuario' });
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { secretWord } = req.body;

  const user = await User.findOne({ secretWord });
  if (!user) {
    return res.status(400).json({ message: 'Palabra secreta incorrecta' });
  }

  const token = jwt.sign({ id: user._id }, 'mi_clave_secreta', { expiresIn: '1h' });
  res.json({ token });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
