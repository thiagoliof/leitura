import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../utils/api'
import { loadPost } from '../actions'

class DetailPost extends Component {
    
    componentDidMount() {
        const { post_id } = this.props.filter.params
        const { loadPost } = this.props
        fetchPost(post_id).then(dados => {
            loadPost(dados)
        })
    }

    render() {
        return (
            <div>details post</div>
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