import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form, Dropdown, Popup, Segment, Divider, Card } from 'semantic-ui-react'
import { fetchPosts, votePost, deletePost, addPost, editPost } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts, orderPosts } from '../actions'
import FormCadasto from './FormCadasto'

import uuidv1 from 'uuid/v1';


class ListPost extends Component {

    state = { 
        open: false,
        // form
        titulo: '', 
        corpo: '', 
        autor: '', 
        categoria: '', 
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

    changePost = (post) =>{
        const {id, author, body, category, title} = post
        this.setState({ id:id, autor:author, corpo:body, categoria:category, titulo:title, open: true })
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

    showModal = size => {
        //alert('entrei')
        this.setState({ size, open: true })
    }
    closeModal = () => {
        this.clearState();
    }

    clearState = () => {
        this.setState({ 
            open: false,  
            titulo: '', 
            corpo: '', 
            autor: '', 
            categoria: '',
            id: ''
        })
    }

    addPost = () => {
        const {titulo, corpo, autor, categoria}  = this.state
        const id = uuidv1();
        addPost(id, Date.now, titulo, corpo, autor, categoria).then(dados => {
            this.getPosts();
            this.clearState();
        })
    }

    editPost = () => {
        const {id, titulo, corpo, autor, categoria}  = this.state
        editPost(id, Date.now, titulo, corpo, autor, categoria).then(dados => {
            this.getPosts();
            this.clearState();
        })
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    render() {
        const { posts } = this.props
        const { open, size } = this.state
        const { titulo, corpo, autor, categoria } = this.state

        const categoryOptions = [
            { value: 'react',   text: 'React'},
            { value: 'redux',   text: 'Redux'},
            { value: 'udacity', text: 'Udacity'},
        ]

        return (
            <div>
                <Button circular icon='add' color='blue' floated='right' onClick={() => this.showModal('small')} />
                <div className={"verticalSpace"}></div>
                {posts.length > 0 && (
                    <Segment padded>
                        {posts.map((post, index) => (
                            <Card.Group>
                                <Card fluid>
                                    <Card.Content>
                                        <Button circular floated='right' className={"removePost"} icon='remove' onClick={() => this.deletePost(post.id)} ></Button>
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
                                            <Button circular icon='thumbs outline up' color='green' onClick={() => this.voteUp(post.id)}></Button>
                                            <Button circular icon='thumbs outline down' color='red' onClick={() => this.voteDown(post.id)}></Button>
                                            <Button circular icon='setting' color='gray' onClick={() => this.changePost(post)}></Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        ))}
                    </Segment>
                )}
                <FormCadasto size={size} open={open} />
                
            </div>
        )
    }
}

function mapStateToProps ({ posts, orderPost }, props) {
    var _posts = posts;
    if (props.filter){
        _posts = posts.filter(e => e.category === props.filter.params.category)
        if (Object.keys(orderPost).length > 0) {
            if(orderPost.order === 'orderUp'){
                _posts = _posts.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ); 
            }
            else if(orderPost.order === 'orderDown'){
                _posts = _posts.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ).reverse();
            }
        }
    } else {
        if(orderPost.order === 'orderUp'){
            _posts = posts.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ); 
        }
        else if(orderPost.order === 'orderDown'){
            _posts = posts.slice().sort(function(a,b) {return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} ).reverse();
        }
    }
    return { posts:_posts, orderPost:orderPost };
}
  
function mapDispatchToProps (dispatch) {
    return {
      loadPosts: (data) => dispatch(loadPosts(data)),
      setOrderPosts: (data) => dispatch(orderPosts(data)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListPost)