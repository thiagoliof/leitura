import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react'
import { fetchComent } from '../utils/api'

class FormComment extends Component {

    state = {
        id: '',
        comment: '',
        author: '',
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.commentId) {
            const commentId = nextProps.commentId;
            fetchComent(commentId).then(dados => {
                this.setState(
                    { 
                        id: dados.id,
                        comment: dados.body,
                        author: dados.author, 
                    }
                )
            })
        }
    }

    clearStateForm = _ => {
        this.setState(
            { 
                id: '',
                comment: '',
                author: '', 
            }
        )
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleCloseModal = _ => {
        this.clearStateForm()
        this.props.onCloseModalComment()
    }

    handleAddComment = _ =>{
        const { postId } = this.props
        const { comment, author } = this.state
        this.props.onAddModalComment({postId, comment, author})
        this.clearStateForm()
    }

    handleEditPost = _ => {
        this.props.onChangeModalComment()
    }

    render() {     
        const { size, open } = this.props
        const { comment, author } = this.state
        return (
            <Modal size={size} open={open}>
                <Modal.Header>
                    Adicionar Comentário
                </Modal.Header>
                <Modal.Content>
                    <div>
                        <Form>
                            <Form.Field>
                                <label>Comentário</label>
                                <Form.Input placeholder='Comentário' name='comment' value={comment} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Autor</label>
                                <Form.Input placeholder='Autor' name='author' value={author} onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=> this.handleCloseModal()}>
                        Cancelar
                    </Button>
                    <Button onClick={()=> this.state.id ? this.handleEditPost() : this.handleAddComment()}>
                        {this.state.id ? "Alterar" : "Adicionar"}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
  
export default FormComment