import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

class App extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='react' active={activeItem === 'react'} onClick={this.handleItemClick} />
          <Menu.Item name='redux' active={activeItem === 'redux'} onClick={this.handleItemClick} />
          <Menu.Item name='udacity' active={activeItem === 'udacity'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    );
  }
}

export default App;
