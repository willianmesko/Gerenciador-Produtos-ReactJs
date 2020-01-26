import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const apis = {
  readCategoria: (id) => api.get('categorias/' + id),
  loadCategorias: () => api.get('categorias'),
  deleteCategorias: (id) => api.delete('categorias/' + id),
  createCategoria: (categoria) => api.post('categorias', categoria),
  editCategoria: (categoria) => api.put('categorias/' + categoria.id, categoria),

  readProduto: (id) => api.get('produtos/' + id),
  createProduto: (produto) => api.post('produtos', produto),
  loadProdutos: (categoria) => api.get('produtos?categoria=' + categoria),
  deleteProduto: (id) => api.delete('produtos/' + id),
  editProduto: (produto) => api.put('produtos/' + produto.id, produto)

}

export default apis
