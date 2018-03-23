import React from 'react';
import { Container, Header } from 'semantic-ui-react'

const Component404 = props => (
 
    <div>
        <Container textAlign='center' fluid>
            <Header size='huge'>{props.header}</Header>
            <Header size='large'>{props.body}</Header>
        </Container>
    </div>

);

export default Component404;