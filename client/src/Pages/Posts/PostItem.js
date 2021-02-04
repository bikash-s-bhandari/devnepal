import React from 'react'

const PostItem = () => {
    return (
        <>
            <div className="post bg-white p-1 my-1">
                <div>
                    <a href="profile.html">
                        <img
                            className="round-img"
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                            alt=""
                        />
                        <h4>John Doe</h4>
                    </a>
                </div>
                <div>
                    <p className="my-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                        possimus corporis sunt necessitatibus! Minus nesciunt soluta
                        suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                        dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
                    <p className="post-date">
                        Posted on 04/16/2019
            </p>
                    <button type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                        <span>4</span>
                    </button>
                    <button type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <a href="post.html" className="btn btn-primary">
                        Discussion <span className='comment-count'>2</span>
                    </a>
                    <button
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

        </>
    )
}

export default PostItem
