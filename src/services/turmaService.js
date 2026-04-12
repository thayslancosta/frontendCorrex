import api from './api';

export async function getTurmas() {
  const { data } = await api.get('/turmas');
  return data;
}

export async function createTurma(turma) {
  const { data } = await api.post('/turmas', turma);
  return data;
}
