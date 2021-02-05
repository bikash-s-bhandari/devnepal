import React, { Fragment, useEffect } from 'react';
import { } from './PostForm'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/Actions/postActions';

const Posts = (props) => {
    const { post: { posts }, getPosts } = props;
    console.log('posts', posts)
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
      </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            <PostForm />


            <div className="posts">
                {posts.length > 0 && posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}


            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(Posts);
