import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class ListPost extends Component {

    render() {

        const { post } = this.props
        console.log(post)

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
                            <Table.HeaderCell singleLine><a href='#'>18 studies</a></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            
                        {post.map((_post, index) => (
                            
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {_post.title}
                                </Table.Cell>
                                <Table.Cell singleLine>{_post.author}</Table.Cell>
                                <Table.Cell>numero coments</Table.Cell>
                                <Table.Cell textAlign='right'>pontuação% 
                                    <br /><a href='#'>18 studies</a>
                                </Table.Cell>
                                <Table.Cell>
                                    votar
                                </Table.Cell>
                                <Table.Cell>
                                    ordenação
                                </Table.Cell>
                            </Table.Row>

                        ))}

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