import api from './api';

export async function getRedacoes(params = {}) {
  const { data } = await api.get('/redacoes', { params });
  return data;
}

export async function getRedacao(id) {
  const { data } = await api.get(`/redacoes/${id}`);
  return data;
}

export async function enviarRedacaoTexto(payload) {
  const { data } = await api.post('/redacoes/texto', payload);
  return data;
}

export async function enviarRedacaoArquivo(formData) {
  const { data } = await api.post('/redacoes/arquivo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function revisarRedacao(id, payload) {
  const { data } = await api.post(`/redacoes/${id}/revisao`, payload);
  return data;
}
