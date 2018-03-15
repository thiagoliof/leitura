import React, { Component } from 'react';
import { Header, Table, Rating, Button } from 'semantic-ui-react'
import { fetchPosts } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class ListPost extends Component {

    VoteUp = (id) => {
        alert(`VoteUp - ${id}`)
    }

    VoteDown = (id) => {
        alert(`VoteDown - ${id}`)
    }

    componentDidMount() {
        const { loadPosts } = this.props
        fetchPosts().then(dados => {
          loadPosts(dados)
        })
    }

    render() {
        const { post } = this.props
        return (
            <div>
                <div className={"verticalSpace"}></div>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Título</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Autor</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Número de comentários</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Pontuação atual</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Votar</Table.HeaderCell>
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
                                <Table.Cell textAlign='right'>
                                    {_post.voteScore} Pontos
                                </Table.Cell>
                                <Table.Cell>
                                    <Button circular icon='thumbs outline up' onClick={() => this.VoteUp(_post.id)}></Button>
                                    <Button circular icon='thumbs outline down' onClick={() => this.VoteDown(_post.id)}></Button>
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