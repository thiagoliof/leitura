import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadCategory, selectMenu } from '../actions'

import { fetchCategories } from '../utils/api'

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
                  <Menu.Item key={index}  name={cat.name}   active={activeMenuItem === cat.name}  onClick={this.handleItemClick} />
              ))}
            </Menu>
          )}
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
