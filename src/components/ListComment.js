import React, { Component } from 'react';
import { Segment, Card, Button, Header, Popup } from 'semantic-ui-react'

class ListComment extends Component {
    
    state = { 
    }

    componentDidMount() {        
    }

    changeComment = commentId =>{
        this.props.onChangeComment(commentId)
    }

    voteCommentUp = commentId => {
        this.props.onVoteComment(commentId, "upVote")
    }

    voteCommentDown = commentId => {
        this.props.onVoteComment(commentId, "downVote")
    }

    deleteComment = commentId => {
        this.props.onDeleteComment(commentId)
    }

    render() {
        const { commentCount, comments } = this.props
        return (
            <Segment.Group>
                <Segment>
                    <Header as='h4'>Número de comentários: { commentCount }</Header>
                </Segment>
                <Segment.Group>
                    {comments.length > 0 && (
                        comments.map((comment, index) => (
                            <Segment key={index}>
                                <Card.Group key={index}>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>{comment.body}</Card.Header>
                                            <Card.Description>Autor: {comment.author}</Card.Description>
                                            <Card.Meta>Pontos: {comment.voteScore}</Card.Meta>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div>
                                                <Popup 
                                                    trigger={
                                                        <Button circular icon='thumbs outline up' color='green' onClick={() => this.voteCommentUp(comment.id)} ></Button>
                                                    }
                                                    content='Votar positivamente'
                                                    position='top left'
                                                />

                                                <Popup 
                                                    trigger={
                                                        <Button circular icon='thumbs outline down' color='red' onClick={() => this.voteCommentDown(comment.id)} ></Button>
                                                    }
                                                    content='Votar negativamente'
                                                    position='top left'
                                                />
                                                
                                                <Popup 
                                                    trigger={
                                                        <Button circular icon='write' onClick={() => this.changeComment(comment.id)}></Button>                
                                                    }
                                                    content='Alterar comentário'
                                                    position='top left'
                                                />

                                                <Popup 
                                                    trigger={
                                                        <Button circular icon='remove' onClick={() => this.deleteComment(comment.id)}></Button>
                                                    }
                                                    content='Excluir comentário'
                                                    position='top left'
                                                />
                                                
                                            </div>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </Segment>
                        ))
                    )}
                </Segment.Group>
            </Segment.Group>
        )
    }
}
export default ListComment