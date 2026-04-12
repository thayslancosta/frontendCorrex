import api from './api';

export async function getAlunos(params = {}) {
  const { data } = await api.get('/alunos', { params });
  return data;
}
