import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadCategory, selectMenu } from '../actions'

import { fetchCategories } from '../utils/api'
import { capitalize } from '../utils/helpers'

class App extends Component {

  // state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    const { selectItemMenu } = this.props
    selectItemMenu(name)
  }

  componentDidMount() {
    const { loadCategories } = this.props
    fetchCategories().then(dados => {
      loadCategories(dados.categories)
    })
  }

  render() {

    const  activeItem  = 'redux'
    const { category, activeMenuItem } = this.props
  
    return (
      <BrowserRouter>
        <div>
          {category.length > 0 && (
            <Menu pointing secondary>
              {category.map((cat, index) => (
                <Link key={index} to={"/" + (index === 0 ? "" : cat.name)} className={"item"} params={cat.name} >{capitalize(cat.name)}</Link>
              ))}
            </Menu>
          )}
          <Route path="/" exact render={() => (
            <div>Todas Postagem</div>
          )}/>
          <Route path="/react" exact render={() => (
            <div>filtro react</div>
          )}/>
          <Route path="/redux" exact render={() => (
            <div>filtro redux</div>
          )}/>
          <Route path="/udacity" exact render={() => (
            <div>filtro udacity</div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ category, activeMenuItem }) {
  return { category, activeMenuItem };
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategory(data)),
    selectItemMenu: (data) => dispatch(selectMenu(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
