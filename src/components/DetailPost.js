import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, Segment, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchPost, votePost, editPost, deletePost } from '../utils/api'
import { loadPost } from '../actions'
import FormPost from './FormPost'

class DetailPost extends Component {
    
    state = { 
        open: false,
        idEdit: '',
        redirect : false
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        const { post_id } = this.props.filter.params
        const { loadPost } = this.props
        fetchPost(post_id).then(dados => {
            loadPost(dados)
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

    render() {

        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }

        const { post } = this.props
        const { open, size, idEdit } = this.state
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
                                <Button circular floated='right' icon='remove' className={"removePost"} onClick={() => this.deletePost(post.id)} ></Button>
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
                                    <Button circular icon='thumbs outline up' color='green' onClick={() => this.voteUp(post.id)}></Button>
                                    <Button circular icon='thumbs outline down' color='red' onClick={() => this.voteDown(post.id)}></Button>
                                    <Button circular icon='write' onClick={() => this.changePost('small', post.id)}></Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
            
                <FormPost 
                    size={size} 
                    open={open} 
                    categoryOptions={categoryOptions}
                    onCloseModal={this.closeModal}
                    onChangePost={this.editPost}
                    idEdit={idEdit}
                />
            </div>
            
        )
    }
}
function mapStateToProps ({ post }, props) {
    return {post:post}
}

function mapDispatchToProps (dispatch) {
    return {
      loadPost: (data) => dispatch(loadPost(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)