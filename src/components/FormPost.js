import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react'
import { fetchPost } from '../utils/api'

class FormPost extends Component {

    state = {     
        title:      '',
        body:       '',
        author:     '',
        category:   '',
    }

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.idEdit) {
            const idEdit = nextProps.idEdit;
            fetchPost(idEdit).then(dados => {
                this.setState(
                    { 
                        idEdit : idEdit,
                        //
                        title: dados.title,
                        body: dados.body,
                        author: dados.author,
                        category: dados.category 
                    })
            })
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    clearState = _ =>{
        this.setState({ 
            idEdit : '',
            //
            title:  '',
            body: '',
            author: '',
            category: '',
        })
    }

    handleAddPost = _ =>{
        const { title, body, author, category } = this.state
        this.props.onAddPost({title, body, author, category})
        this.clearState()
    }

    handleEditPost = _ =>{
        const { idEdit, title, body, author, category } = this.state
        this.props.onChangePost({idEdit, title, body, author, category})
        this.clearState()
        
    }

    handleCloseModal(){
        this.clearState()
        this.props.onCloseModal()
    }

    render() {     
        
        const { title, body, author, category } = this.state
        const { categoryOptions } = this.props
        
        return (
            <Modal size={this.props.size} open={this.props.open}>
                <Modal.Header>
                    Adicionar Post
                </Modal.Header>
                <Modal.Content>
                    <div>
                        <Form>
                            <Form.Field>
                                <label>Título</label>
                                <Form.Input placeholder='Título' name='title' value={title} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Corpo</label>
                                <Form.Input placeholder='Corpo' name='body' value={body} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Autor</label>
                                <Form.Input placeholder='Autor' name='author' value={author} onChange={this.handleChange}  />
                            </Form.Field>
                            <Form.Field>
                                <label>categoria completar</label>
                                <Dropdown placeholder='Selecione a Categoria' fluid selection options={categoryOptions} name='category' value={category} onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={()=> this.handleCloseModal()}>
                        Cancelar
                    </Button>
                    <Button onClick={()=> this.state.idEdit ? this.handleEditPost() : this.handleAddPost()}>
                        {this.state.idEdit ? "Alterar" : "Adicionar"}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
  
export default FormPost