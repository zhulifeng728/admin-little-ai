import request from '../utils/request'

// 知识库API
export const knowledgeAPI = {
  getList: () => request.get('/knowledge'),
  getById: (id) => request.get(`/knowledge/${id}`),
  create: (data) => request.post('/knowledge', data),
  update: (id, data) => request.put(`/knowledge/${id}`, data),
  delete: (id) => request.delete(`/knowledge/${id}`)
}

// 路由API
export const routeAPI = {
  getList: () => request.get('/routes'),
  getById: (id) => request.get(`/routes/${id}`),
  create: (data) => request.post('/routes', data),
  update: (id, data) => request.put(`/routes/${id}`, data),
  delete: (id) => request.delete(`/routes/${id}`)
}

// AI模型API
export const modelAPI = {
  getList: () => request.get('/models'),
  getById: (id) => request.get(`/models/${id}`),
  create: (data) => request.post('/models', data),
  update: (id, data) => request.put(`/models/${id}`, data),
  delete: (id) => request.delete(`/models/${id}`),
  activate: (id) => request.post(`/models/${id}/activate`)
}
