import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categorias: [],
      produtos: [],
      categoria: ''
    }

    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)
  }

  loadCategorias () {
    this.props.api.loadCategorias().then(res => {
      this.setState({categorias: res.data})
    }).catch(e => {
      console.log(e)
    })
  }

  removeCategoria (categoria) {
    this.props.api.deleteCategorias(categoria.id).then((res) => {
      this.loadCategorias()
    })
  }

  createCategoria (categoria) {
    this.props.api.createCategoria(categoria).then((res) => {
      this.loadCategorias()
    })
  }

  editCategoria (categoria) {
    this.props.api.editCategoria(categoria).then((res) => {
      this.loadCategorias()
    })
  }

  createProduto (produto) {
    return this.props.api.createProduto(produto)
  }

  loadProdutos (categoria) {
    console.log(categoria)
    this.props.api.loadProdutos(categoria).then((res) => {
      this.setState({produtos: res.data})
    })
  }

  loadCategoria (categoria) {
    this.props.api.readCategoria(categoria).then((res) => {
      this.setState({categoria: res.data})
    })
  }

  removeProduto (produto) {
    return this.props.api.deleteProduto(produto.id)
  }

  readProduto (id) {
    return this.props.api.readProduto(id)
  }

  editProduto (produto) {
    return this.props.api.editProduto(produto)
  }

  render () {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand' >Gerenciador de Produtos</a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <h1>Gerenciador de Produtos</h1>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (<Produtos {...props}
                loadCategorias={this.loadCategorias}
                categorias={this.state.categorias}
                removeCategoria={this.removeCategoria}

                readProduto={this.readProduto}
                createCategoria={this.createCategoria}
                editCategoria={this.editCategoria}
                createProduto={this.createProduto}
                loadProdutos={this.loadProdutos}
                loadCategoria={this.loadCategoria}
                produtos={this.state.produtos}
                categoria={this.state.categoria}
                removeProduto={this.removeProduto}
                editProduto={this.editProduto}
                />)
            }} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
