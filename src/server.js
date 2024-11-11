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

// Endpoint para deletar todos os animais (útil para limpeza de dados durante os testes)
app.delete('/animais', (req, res) => {
  animais = []; // Limpa o banco de dados em memória
  return res.status(200).json({ message: 'Todos os animais foram removidos' });
});

// A exportação do app aqui é essencial para os testes
module.exports = app;

// Inicia o servidor apenas quando não estamos rodando testes
if (require.main === module) {
  const port = '3000';
  app.listen(port, function () {
    console.log(`App rodando na porta ${port}`);
  });
}
