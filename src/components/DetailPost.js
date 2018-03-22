import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, Segment, Divider, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchPost, votePost, editPost, deletePost, addComments, fetchComents, deleteComment, voteComment, editComment } from '../utils/api'
import { loadPost, loadComments } from '../actions'
import FormPost from './FormPost'
import ListComment from './ListComment'
import FormComment from './FormComment'
import uuidv1 from 'uuid/v1';

class DetailPost extends Component {
    
    state = { 
        open: false,
        idEdit: '',
        redirect : false,
        
        // modal comentário
        openModalComment: false,
        idComment: ''

    }

    componentDidMount() {
        this.getPosts()
        this.getComments()
    }

    getPosts = () => {
        const { post_id } = this.props.filter.params
        const { loadPost } = this.props
        fetchPost(post_id).then(dados => {
            loadPost(dados)
        })
    }

    getComments = () => {
        const { post_id } = this.props.filter.params
        const { loadComments } = this.props

        fetchComents(post_id).then(dados => {
            loadComments(dados)
        })
    }

    closeModal = () => {
        this.setState({ 
            open: false,
            idEdit: ''
        })
    }

    redirect_to_home = () =>{
        this.setState({ 
            redirect: true,
        })
    }
    
    deletePost = (id) =>{
        deletePost(id).then(dados => {
            this.redirect_to_home()
        })
    }

    voteUp = (id) => {
        votePost(id, "upVote").then(dados => {
            this.getPosts()
        })
    }

    voteDown = (id) => {
        votePost(id, "downVote").then(dados => {
            this.getPosts()
        })
    }

    changePost = (size, idEdit) => {
        this.setState(
            { open: true, size, idEdit: idEdit }
        )
    }

    editPost = ({idEdit, title, body, author, category}) => {
        editPost(idEdit, Date.now, title, body, author, category).then(dados => {
            this.getPosts()
            this.closeModal()
        })
    }

    addComment = (size, postId) =>{
        this.setState(
            { openModalComment: true, size }
        )
    }

    closeModalComment = _ => {
        this.setState(
            { openModalComment: false, commentId: '' }
        )
        
    }

    addModalComent = ({postId, comment, author}) => {
        const id = uuidv1();
        addComments(id, Date.now, comment, author, postId).then(dados => {
            this.getPosts()
            this.getComments()
            this.closeModalComment()    
        })
    }

    deleteComment = commentId => {
        deleteComment(commentId).then(dados => {
            this.getPosts()
            this.getComments()
        })
    }

    voteComment = (id, vote) => {
        voteComment(id, vote).then(dados => {
            this.getPosts()
            this.getComments()
        })
    }

    changeComment = commentId => {
    
        this.setState(
            { 
                openModalComment: true, 
                size:'small',
                commentId:commentId
            }
        )
    }

    changeModalComment = ({id, comment, author}) => {
        editComment(id, Date.now, comment, author).then(dados => {
            this.getPosts()
            this.getComments()
            this.closeModalComment()    
        })
    }

    render() {

        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }

        const { post, comment } = this.props
        const { open, size, idEdit, openModalComment } = this.state
        const categoryOptions = [
            { value: 'react',   text: 'React'},
            { value: 'redux',   text: 'Redux'},
            { value: 'udacity', text: 'Udacity'},
        ]
        return (
            <div>
                <Segment padded>
                    <Card.Group>
                        <Card fluid>
                            <Card.Content>
                                <Popup 
                                    trigger={
                                        <Button circular floated='right' icon='remove' className={"removePost"} onClick={() => this.deletePost(post.id)} ></Button>
                                    }
                                    content='Remover Post'
                                    position='top left'
                                />
                                <Card.Header>{ post.title }</Card.Header>
                                <Card.Description>{ post.body }</Card.Description>
                                <Card.Meta><Divider horizontal>Informações</Divider></Card.Meta>
                                <Card.Meta>Autor: { post.author }</Card.Meta>
                                <Card.Meta>Ponto(s): { post.voteScore } </Card.Meta>
                                <Card.Meta>Comentário(s): { post.commentCount } </Card.Meta>
                                <Card.Meta>Categoria: { post.category } </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Popup 
                                        trigger={
                                            <Button circular icon='thumbs outline up' color='green' onClick={() => this.voteUp(post.id)}></Button>
                                        }
                                        content='Votar positivamente'
                                        position='top left'
                                    />
                                    <Popup 
                                        trigger={
                                            <Button circular icon='thumbs outline down' color='red' onClick={() => this.voteDown(post.id)}></Button>
                                        }
                                        content='Votar negativamente'
                                        position='top left'
                                    />
                                    <Popup 
                                        trigger={
                                            <Button circular icon='comments' color='blue' onClick={() => this.addComment('small', post.id)}></Button>
                                        }
                                        content='Add comentário'
                                        position='top left'
                                    />
                                    <Popup 
                                        trigger={
                                            <Button circular icon='write' onClick={() => this.changePost('small', post.id)}></Button>
                                        }
                                        content='Alterar post'
                                        position='top left'
                                    />
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
                
                <ListComment 
                    commentCount={post.commentCount} 
                    comments={comment} 
                    onDeleteComment={this.deleteComment}
                    onVoteComment={this.voteComment}
                    onChangeComment={this.changeComment}  
                />
                            
                <FormPost 
                    size={size} 
                    open={open} 
                    categoryOptions={categoryOptions}
                    onCloseModal={this.closeModal}
                    onChangePost={this.editPost}
                    idEdit={idEdit}
                />

                <FormComment 
                    size={size} 
                    open={openModalComment}
                    onCloseModalComment={this.closeModalComment} 
                    postId={post.id}
                    onAddModalComment={this.addModalComent} 
                    commentId={this.state.commentId}
                    onChangeModalComment={this.changeModalComment}
                />
            </div>
            
        )
    }
}
function mapStateToProps ({ post, comment }, props) {
    return {post:post, comment:comment}
}

function mapDispatchToProps (dispatch) {
    return {
      loadPost: (data) => dispatch(loadPost(data)),
      loadComments: (data) => dispatch(loadComments(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)