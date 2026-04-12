import api from './api';

export async function getAlunos(params = {}) {
  try {
    const response = await api.get('/alunos', { params });
    console.log('alunoService.getAlunos() - Response:', response);
    const { data } = response;
    console.log('alunoService.getAlunos() - Data extracted:', data);
    return data;
  } catch (error) {
    console.error('alunoService.getAlunos() - Error:', error.message, error.response?.status, error.response?.data);
    throw error;
  }
}
