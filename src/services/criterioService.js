import api from './api';

export async function getCriterios() {
  const { data } = await api.get('/criterios');
  return data;
}

export async function createCriterio(criterio) {
  const { data } = await api.post('/criterios', criterio);
  return data;
}

export async function updateCriterio(id, criterio) {
  const { data } = await api.put(`/criterios/${id}`, criterio);
  return data;
}

export async function deleteCriterio(id) {
  await api.delete(`/criterios/${id}`);
}
