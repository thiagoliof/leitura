import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class ListComment extends Component {
    
    state = { 
    }

    componentDidMount() {        
    }

    render() {
        const { commentCount } = this.props
        return (
            <Segment.Group>
                <Segment>Número de comentários: { commentCount }</Segment>
                <Segment.Group>
                    <Segment>Nested Top</Segment>
                    <Segment>Nested Middle</Segment>
                    <Segment>Nested Bottom</Segment>
                </Segment.Group>
            </Segment.Group>
        )
    }
}
export default ListComment