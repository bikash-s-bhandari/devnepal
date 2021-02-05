import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../Utils/formatDate'
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../redux/Actions/postActions'
const PostItem = ({ post, auth, showActions, deletePost, addLike, removeLike }) => {
    const { _id, text, name, avatar, user, likes, comments, date } = post;
    return (
        <>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img className="round-img" src={avatar} alt="" />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <p className="post-date">
                        Posted on {formatDate(date)}
                    </p>
                    {
                        showActions && (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => addLike(_id)}
                                >
                                    <i className="fas fa-thumbs-up"></i>{' '}
                                    <span>{likes.length > 0 && likes.length}</span>
                                </button>
                                <button
                                    onClick={() => removeLike(_id)}
                                    type="button"
                                    className="btn btn-light"
                                >
                                    <i className="fas fa-thumbs-down" />
                                </button>


                                <Link to={`/posts/${_id}`} className="btn btn-primary">
                                    Discussion{' '}
                                    {comments.length > 0 && (
                                        <span className="comment-count">{comments.length}</span>
                                    )}
                                </Link>

                                {!auth.loading && user === auth.user._id && (
                                    <button
                                        onClick={() => deletePost(_id)}
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                )}


                            </>
                        )


                    }

                </div>
            </div>

        </>
    )
}

PostItem.defaultProps = {
    showActions: true
};


PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
const mapActionsToProps = {
    deletePost,
    addLike,
    removeLike
}

export default connect(mapStateToProps, mapActionsToProps)(PostItem)
