import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Menu, Button, Header, Table, Rating } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadCategory } from '../actions'

import { fetchCategories } from '../utils/api'
import { capitalize } from '../utils/helpers'

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
            <Button circular icon='add' color='blue' floated='right'/>
            {/**/}
                  <br/>
                  <br/>
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>Título</Table.HeaderCell>
                        <Table.HeaderCell>Autor</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Número de comentários</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Pontuação atual</Table.HeaderCell>
                        <Table.HeaderCell>Votar</Table.HeaderCell>
                        <Table.HeaderCell>Ordernação</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h2' textAlign='center'>A</Header>
                        </Table.Cell>
                        <Table.Cell singleLine>Power Output</Table.Cell>
                        <Table.Cell>
                          <Rating icon='star' defaultRating={3} maxRating={3} />
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            80% <br />
                          <a href='#'>18 studies</a>
                        </Table.Cell>
                        <Table.Cell>
                            votar
                        </Table.Cell>
                        <Table.Cell>
                            x
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h2' textAlign='center'>A</Header>
                        </Table.Cell>
                        <Table.Cell singleLine>Weight</Table.Cell>
                        <Table.Cell>
                          <Rating icon='star' defaultRating={3} maxRating={3} />
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            100% <br />
                          <a href='#'>65 studies</a>
                        </Table.Cell>
                        <Table.Cell>
                            xxx
                        </Table.Cell>
                        <Table.Cell>
                            x
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>

            {/**/}
            </div>
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

function mapStateToProps ({ category }) {
  return { category };
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(loadCategory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
