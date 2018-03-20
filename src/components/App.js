import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadCategory } from '../actions'

import { fetchCategories } from '../utils/api'
import { capitalize } from '../utils/helpers'

import ListPost from './ListPost'
import DetailPost from './DetailPost'

class App extends Component {

  componentDidMount() {
    const { loadCategories } = this.props
    fetchCategories().then(dados => {
      loadCategories(dados.categories)
    })
  }

  render() {
    const { category } = this.props
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
            <div>
              <ListPost />
            </div>
          )}/>
          <Route path="/:category" exact render={({ match }) => (
            <div>
              <ListPost filter={ match } />
            </div>
          )}/>
          <Route path="/:category/:post_id" exact render={({ match }) => (
            <div>
              <DetailPost filter={ match } />
            </div>
          )}/>
        </div>
      </BrowserRouter>
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
