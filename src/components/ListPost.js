import React, { Component } from 'react';
import { Header, Table, Rating, Button } from 'semantic-ui-react'
import { fetchPosts, votePost, deletePost } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts, orderPosts } from '../actions'

class ListPost extends Component {

    voteUp = (id) => {
        votePost(id, "upVote").then(dados => {
            this.getPosts();
        })
    }

    voteDown = (id) => {
        votePost(id, "downVote").then(dados => {
            this.getPosts();
        })
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const { loadPosts } = this.props
        fetchPosts().then(dados => {
          loadPosts(dados)
        })
    }

    changePost = (id) =>{
        alert(`change - ${id}`)
    }

    deletePost = (id) =>{
        deletePost(id).then(dados => {
            this.getPosts();
        })
    }

    orderUp = _ =>{
        const { setOrderPosts } = this.props
        setOrderPosts({order:`orderUp`})
    }

    orderDown = _ =>{
        const { setOrderPosts } = this.props
        setOrderPosts({order:`orderDown`})
    }

    render() {
        const { post } = this.props
        return (
            <div>
                <div className={"verticalSpace"}></div>
                
                {post.length > 0 && (

                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Título</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Autor</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Número de comentários</Table.HeaderCell>
                                <Table.HeaderCell singleLine>
                                    Pontuação atual 
                                        <i aria-hidden="true" className={"triangle up big icon"} onClick={() => this.orderUp()}></i>
                                        <i aria-hidden="true" className={"triangle down big icon"} onClick={() => this.orderDown()}></i>
                                </Table.HeaderCell>
                                <Table.HeaderCell singleLine>Votar</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Ações</Table.HeaderCell>
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
                                        {_post.voteScore} Ponto(s)
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button circular icon='thumbs outline up' onClick={() => this.voteUp(_post.id)}></Button>
                                        <Button circular icon='thumbs outline down' onClick={() => this.voteDown(_post.id)}></Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button circular icon='setting' onClick={() => this.changePost(_post.id)}></Button>
                                        <Button circular icon='trash' onClick={() => this.deletePost(_post.id)}></Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table>
                )}
            </div>
        )
    }
}

function mapStateToProps ({ post, orderPost }, props) {
    var _post = post;
    if (props.filter){
        _post = post.filter(e => e.category === props.filter.params.category)
        if (Object.keys(orderPost).length > 0) {
            if(orderPost.order === 'orderUp'){
                _post = _post.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ); 
            }
            else if(orderPost.order === 'orderDown'){
                _post = _post.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ).reverse();
            }
        }
    } else {
        if(orderPost.order === 'orderUp'){
            _post = post.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ); 
        }
        else if(orderPost.order === 'orderDown'){
            _post = post.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ).reverse();
        }
    }
    return { post:_post, orderPost:orderPost };
}
  
function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
      setOrderPosts: (data) => dispatch(orderPosts(data)),
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListPost)