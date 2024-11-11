const express = require('express');
const app = express();

app.use(express.json());

let animais = []; // Banco de dados em memória

app.post('/animais', (req, res) => {
  const { nome, especie, idade } = req.query;

  if (!nome || nome.length < 2) {
    return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
  }

  if (isNaN(idade)) {
    return res.status(400).json({ error: 'Idade deve ser um número' });
  }

  const animal = { nome, especie, idade: parseInt(idade) };
  animais.push(animal);
  return res.status(201).json(animal);
});

app.get('/animais', (req, res) => {
  return res.status(200).json(animais);
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000; // Garantir que a porta seja configurável
  app.listen(port, function () {
    console.log(`App rodando na porta ${port}`);
  });
}
