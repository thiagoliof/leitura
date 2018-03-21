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