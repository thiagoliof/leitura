import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class ListPost extends Component {

    render() {
        return (
            <div>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Título</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Autor</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Número de comentários</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Pontuação atual</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Votar</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Ordernação</Table.HeaderCell>
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
                            <Table.Cell textAlign='right'>80% 
                                <br /><a href='#'>18 studies</a>
                            </Table.Cell>
                            <Table.Cell>
                                votar
                            </Table.Cell>
                            <Table.Cell>
                                x
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

function mapStateToProps ({ post }) {
    return { post };
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListPost)