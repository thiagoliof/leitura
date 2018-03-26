import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Segment, Divider, Card, Container, Icon, Popup } from 'semantic-ui-react'
import { fetchPosts, votePost, deletePost, addPost, editPost } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts, orderPosts } from '../actions'
import FormPost from './FormPost'
import { capitalize } from '../utils/helpers'
import uuidv1 from 'uuid/v1';


class ListPost extends Component {

    state = { 
        open: false,
        idEdit: '',
    }
    

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

    changePost = (size, idEdit) => {
        this.setState(
            { open: true, size, idEdit: idEdit }
        )
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

    showModalAddPost = size => {
        this.setState({ 
                size, 
                open: true 
        })
    }
    closeModal = () => {
        this.setState({ 
            open: false,
            idEdit: ''
        })
    }

    addPost = ({title, body, author, category}) => {
        const id = uuidv1();
        addPost(id, Date.now, title, body, author, category).then(dados => {
            this.getPosts();
            this.closeModal();
        })
    }

    editPost = ({idEdit, title, body, author, category}) => {
        editPost(idEdit, Date.now, title, body, author, category).then(dados => {
            this.getPosts();
            this.closeModal();
        })
        
    }

    render() {
        const { posts, category } = this.props
        const { open, size, idEdit } = this.state

        return (
            <div>
                <Popup 
                    trigger={
                        <Button circular icon='add' color='blue' floated='right' onClick={() => this.showModalAddPost('small')} />
                    }
                    content='Add Post'
                    position='bottom right'
                />
                
                <div className={"verticalSpace"}></div>
                {posts.length > 0 && (
                    <div>
                        <Container textAlign='center'>
                        <Button.Group>
                            <Popup 
                                trigger={
                                    <Button icon onClick={this.orderDown}>
                                        <Icon name='chevron up' />
                                    </Button>
                                }
                                content='Ordenar do maior para o menor'
                                position='top right'
                            />
                                <Button.Or text='ou'/>
                            <Popup 
                                trigger={
                                    <Button icon onClick={this.orderUp}>
                                        <Icon name='chevron down' />
                                    </Button>
                                }
                                content='Ordenar do menor para o maior'
                                position='top right'
                            />
                            </Button.Group>
                        </Container>
                    </div>
                )}
                {posts.length > 0 && (
                    <Segment padded>
                        {posts.map((post, index) => (
                            <Card.Group key={index}>
                                <Card fluid>
                                    <Card.Content>
                                        <Popup 
                                            trigger={
                                                <Button circular floated='right' className={"removePost"} icon='remove' onClick={() => this.deletePost(post.id)} ></Button>
                                            }
                                            content='Remover Post'
                                            position='top left'
                                        />
                                        <Card.Header><Link key={index} to={`/${post.category}/${post.id}`}>{post.title}</Link></Card.Header>
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
                                                content='Votar Positivamente'
                                                position='top left'
                                            />
                                            <Popup 
                                                trigger={
                                                    <Button circular icon='thumbs outline down' color='red' onClick={() => this.voteDown(post.id)}></Button>
                                                }
                                                content='Votar Negativamente'
                                                position='top left'
                                            />
                                            
                                            <Popup 
                                                trigger={
                                                    <Button circular icon='write' onClick={() => this.changePost('small', post.id)}></Button>
                                                }
                                                content='Alterar Post'
                                                position='top left'
                                            />
                                            
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        ))}
                    </Segment>
                )}
                
                <FormPost 
                    size={size} 
                    open={open} 
                    categoryOptions={category}
                    onCloseModal={this.closeModal}
                    onAddPost={this.addPost}
                    onChangePost={this.editPost}
                    idEdit={idEdit}
                />
                
            </div>
        )
    }
}

const orderPostToShow = (posts, order) =>{
    if(order === 'orderUp'){
        posts = posts.slice().sort(function(a,b) {
            return (a.voteScore - b.voteScore);
        }); 
    }
    else if(order === 'orderDown'){
        posts = posts.slice().sort(function(a,b) {
            return (b.voteScore - a.voteScore);
        })
    }

    return posts

}

function mapStateToProps ({ posts, orderPost, category }, props) {
    var _posts = posts;
    if (props.filter){
        _posts = posts.filter(e => e.category === props.filter.params.category)
        if (Object.keys(orderPost).length > 0) {
            if(orderPost.order === 'orderUp'){
                _posts = orderPostToShow(_posts, 'orderUp')
            }
            else if(orderPost.order === 'orderDown'){
                _posts = orderPostToShow(_posts, 'orderDown')
            }
        }
    } else {
        if(orderPost.order === 'orderUp'){
            _posts = orderPostToShow(_posts, 'orderUp')
        }
        else if(orderPost.order === 'orderDown'){
            _posts = orderPostToShow(_posts, 'orderDown')
        }
    }

    const _category = category.map(data => {
        return {value:data.name, text: capitalize(data.path)}
    })

    return { posts:_posts, orderPost:orderPost, category:_category };
}
  
function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
      setOrderPosts: (data) => dispatch(orderPosts(data)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListPost)