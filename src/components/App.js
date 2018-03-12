import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

import { connect } from 'react-redux'

class App extends Component {

  //state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState(
      { activeItem: name }
  )

  render() {

    const { activeItem } = {}
    console.log(this.props)

    return (
      <div>
        <Menu pointing secondary>
          
          <Menu.Item name='react'   active={activeItem === 'react'} onClick={this.handleItemClick} />
          <Menu.Item name='redux'   active={activeItem === 'redux'} onClick={this.handleItemClick} />
          <Menu.Item name='udacity' active={activeItem === 'udacity'} onClick={this.handleItemClick} />

        </Menu>
      </div>
    );
  }
}

function mapStateToProps ({ category }) {
  return { category:category };
}

export default connect(mapStateToProps)(App)
