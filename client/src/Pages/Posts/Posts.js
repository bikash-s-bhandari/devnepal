import React, { Fragment, useEffect } from 'react';
import { } from './PostForm'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
// import { getPosts } from '../../actions/post';
// { getPosts, post: { posts } }
const Posts = () => {
    //   useEffect(() => {
    //     getPosts();
    //   }, [getPosts]);

    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
      </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            <PostForm />


            <div className="posts">
                <PostItem />



            </div>
        </Fragment>
    );
};

// Posts.propTypes = {
//     getPosts: PropTypes.func.isRequired,
//     post: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//     post: state.post
// });

export default Posts;
