import React, { Component } from 'react';
import { Table, Button, Modal, Form, Select } from 'semantic-ui-react'
import { fetchPosts, votePost, deletePost } from '../utils/api'
import { connect } from 'react-redux'
import { loadPosts, orderPosts } from '../actions'

class ListPost extends Component {

    state = { open: false }

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

    showModal = size => {
        //alert('entrei')
        this.setState({ size, open: true })
    }
    closeModal = () => {
        this.setState({ open: false })
    }

    addPost = () => {
        //alert('added')
        this.setState({ open: false })

        // title
        // body
        // author
        // category
    }

    render() {
        const { post } = this.props
        const { open, size } = this.state
        const countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }]
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

                
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>
                            Adicionar Post
                        </Modal.Header>
                        <Modal.Content>
                            <p>
                                <Form>
                                    <Form.Field>
                                        <label>Título</label>
                                        <input placeholder='Título' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Corpo</label>
                                        <input placeholder='Corpo' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Autor</label>
                                        <input placeholder='Autor' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Categoria</label>
                                        <Select placeholder='Select your country' options={countryOptions} />
                                    </Form.Field>
                                </Form>
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => this.closeModal()}>
                                Cancelar
                            </Button>
                            <Button positive onClick={() => this.addPost()}>
                                Adicionar
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