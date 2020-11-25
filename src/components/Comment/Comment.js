import React from 'react';
import { formatTime } from '../../common/helperFunctions';
import './Comment.css';

const Comment = ({ comment }) => {
    const time = formatTime(comment.time);

    return(
        <div className="comment-section p-1">
            {comment.content}
            <span className="meta-data font-small"> - {comment.askedBy}</span>
            <span className="meta-data font-small"> {time} ago</span>
        </div>
    )
}

export default Comment;