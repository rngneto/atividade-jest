const request = require('supertest');
const app = require('../src/server');

describe('Cadastro de animais (POST)', () => {
  test('Deve cadastrar um animal com sucesso', async () => {
    const response = await request(app)
      .post('/animais')
      .query({ nome: 'Spike', especie: 'Cachorro', idade: 3 }); // Dados enviados via query string

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('nome', 'Spike');
    expect(response.body).toHaveProperty('especie', 'Cachorro');
    expect(response.body).toHaveProperty('idade', 3);
  });

  test('Deve retornar 400 para idade inválida', async () => {
    const response = await request(app)
      .post('/animais')
      .query({ nome: 'Mimi', especie: 'Gato', idade: 'jovem' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Idade deve ser um número');
  });

  test('Deve retornar 400 para nome muito curto', async () => {
    const response = await request(app)
      .post('/animais')
      .query({ nome: 'J', especie: 'Hamster', idade: 1 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome deve ter pelo menos 2 caracteres');
  });

  afterAll(() => {
    // Limpeza de dados após os testes, se necessário
  });
});
