import React, { Component } from 'react';
import { Button, Card, Segment, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchPost, votePost } from '../utils/api'
import { loadPost } from '../actions'

class DetailPost extends Component {
    
    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        const { post_id } = this.props.filter.params
        const { loadPost } = this.props
        fetchPost(post_id).then(dados => {
            loadPost(dados)
        })
    }
    
    deletePost = (id) =>{
        alert(`delete => ${id}`)
        //deletePost(id).then(dados => {
            //this.getPosts();
        //})
    }

    voteUp = (id) => {
        votePost(id, "upVote").then(dados => {
            this.getPosts()
        })
    }

    voteDown = (id) => {
        votePost(id, "downVote").then(dados => {
            this.getPosts()
        })
    }

    render() {
        const { post } = this.props
        return (
            <Segment padded>
                <Card.Group>
                    <Card fluid>
                        <Card.Content>
                            <Button circular floated='right' icon='remove' onClick={() => this.deletePost(post.id)} ></Button>
                            <Card.Header>{ post.title }</Card.Header>
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
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Segment>
        )
    }
}
function mapStateToProps ({ post }, props) {
    return {post:post}
}

function mapDispatchToProps (dispatch) {
    return {
      loadPost: (data) => dispatch(loadPost(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)