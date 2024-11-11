const request = require('supertest');
const app = require('../src/server');

describe('Cadastro de animais (POST)', () => {
  test('Deve cadastrar um animal com sucesso', async () => {
    const response = await request(app)
      .post('/animais')
      .query({ nome: 'Spike', especie: 'Cachorro', idade: 3 });

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
});

describe('Retorno da lista de animais (GET)', () => {
  // Cadastra 3 animais antes de rodar os testes
  beforeAll(async () => {
    // Deleta qualquer dado anterior, para garantir que começamos com lista vazia
    await request(app).delete('/animais');

    // Cadastra 3 animais
    await request(app).post('/animais').query({ nome: 'Spike', especie: 'Cachorro', idade: 3 });
    await request(app).post('/animais').query({ nome: 'Mimi', especie: 'Gato', idade: 2 });
    await request(app).post('/animais').query({ nome: 'Juju', especie: 'Coelho', idade: 1 });
  });

  test('Deve retornar 3 animais com sucesso', async () => {
    const response = await request(app).get('/animais');
    console.log(response.body); // Log para depuração

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3); // Verifica se há 3 animais
  });

  // Limpeza de dados após todos os testes
  afterAll(async () => {
    // Limpa os dados de animais após os testes
    await request(app).delete('/animais');
  });
});
