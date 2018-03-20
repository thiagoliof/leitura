import React, { Component } from 'react';
import { Modal, Form, Button, Dropdown } from 'semantic-ui-react'


class FormCadasto extends Component {

    state = { 
        
        // form
        titulo: '', 
        corpo: '', 
        autor: '', 
        categoria: '', 
    }

    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {     
        
        const categoryOptions = [
            { value: 'react',   text: 'React'},
            { value: 'redux',   text: 'Redux'},
            { value: 'udacity', text: 'Udacity'},
        ]

        const { titulo, corpo, autor, categoria } = this.state
        
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
                    <Button negative>
                        Cancelar
                    </Button>
                    <Button>
                        {this.state.id? 'Alterar' :  'Adicionar'}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
  
export default FormCadasto