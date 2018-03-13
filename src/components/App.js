import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadCategory } from '../actions'

import { fetchCategories } from '../utils/api'

class App extends Component {

  // state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState(
  //     { activeItem: name }
  // )

  componentDidMount() {
    const { loadCategories } = this.props
    fetchCategories().then(dados => {
      loadCategories(dados.categories)
    })
  }

  render() {

    const  activeItem  = 'redux'
    const { category } = this.props
  
    return (
      <div>
        {category.length > 0 && (
          <Menu pointing secondary>
            {category.map((cat, index) => (
                <Menu.Item key={index} name={cat.name}   active={activeItem === cat.name}   onClick={this.handleItemClick} />
            ))}
          </Menu>
        )}
      </div>
    );
  }
}

function mapStateToProps ({ category }) {
  return { category };
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
