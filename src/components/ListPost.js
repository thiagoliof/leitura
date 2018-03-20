import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form, Dropdown, Popup } from 'semantic-ui-react'
import { fetchPosts, votePost, deletePost, addPost, editPost } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts, orderPosts } from '../actions'

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
        const { post } = this.props
        const { open, size } = this.state
        const { titulo, corpo, autor, categoria } = this.state

        const categoryOptions = [
            { value: 'react',   text: 'React'},
            { value: 'redux',   text: 'Redux'},
            { value: 'udacity', text: 'Udacity'},
        ]

        return (
            <div>
                <Button circular icon='add' color='blue' floated='right' onClick={() => this.showModal('small')}/>
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
                                    <Popup
                                        trigger={
                                            <i aria-hidden="true" className={"triangle up big icon"} onClick={() => this.orderUp()}></i>}
                                            content='Menor para o maior' size='mini' position='top center' />   
                                    <Popup
                                        trigger={
                                            <i aria-hidden="true" className={"triangle down big icon"} onClick={() => this.orderDown()}></i> }
                                            content='Maior para o menor' size='mini' position='top center' /> 
                                </Table.HeaderCell>
                                <Table.HeaderCell singleLine>Votar</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {post.map((_post, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Link key={index} to={`/${_post.category}/${_post.id}`}>{_post.title}</Link>
                                    </Table.Cell>
                                    <Table.Cell singleLine>{_post.author}</Table.Cell>
                                    <Table.Cell>{_post.commentCount} Comentário(s)</Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        {_post.voteScore} Ponto(s)
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button circular icon='thumbs outline up' onClick={() => this.voteUp(_post.id)}></Button>
                                        <Button circular icon='thumbs outline down' onClick={() => this.voteDown(_post.id)}></Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button circular icon='setting' onClick={() => this.changePost(_post)}></Button>
                                        <Button circular icon='trash' onClick={() => this.deletePost(_post.id)}></Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
                    <Modal size={size} open={open}>
                        <Modal.Header>
                            Adicionar Post
                        </Modal.Header>
                        <Modal.Content>
                            <div>
                                <Form>
                                    <Form.Field>
                                        <label>Título</label>
                                        <Form.Input placeholder='Título' name='titulo' value={titulo} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Corpo</label>
                                        <Form.Input placeholder='Corpo' name='corpo' value={corpo} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Autor</label>
                                        <Form.Input placeholder='Autor' name='autor' value={autor} onChange={this.handleChange}  />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>categoria completar</label>
                                        <Dropdown placeholder='Selecione a Categoria' fluid selection options={categoryOptions} name='categoria' value={categoria} onChange={this.handleChange} />
                                    </Form.Field>
                                </Form>
                            </div>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => this.closeModal()}>
                                Cancelar
                            </Button>
                            <Button positive onClick={() => this.state.id? this.editPost() :this.addPost()}>
                                {this.state.id? 'Alterar' :  'Adicionar'}
                            </Button>
                        </Modal.Actions>
                    </Modal>
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