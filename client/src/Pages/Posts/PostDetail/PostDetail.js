import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../Components/layout/Spinner';
import { getPostById } from '../../../redux/Actions/postActions'
import PostItem from '../PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const PostDetail = ({ getPostById, post: { post, loading }, match }) => {
    //NOTE:match comes form router props
    useEffect(() => {
        getPostById(match.params.id);
    }, [getPostById, match.params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
            <>
                <Link to="/posts" className="btn">
                    Back To Posts
          </Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className="comments">
                    {post.comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </>
        );
}

PostDetail.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

const mapActionsToProps = {
    getPostById
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
