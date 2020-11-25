import React from 'react';
import Comment from '../Comment/Comment';

const ShowComment = ({ comments =[] }) => {
    return(
        <div className="m-3">
            <span className="p-1">{comments.length ? 'Comments' : ''}</span>
            {comments.map(comment => <Comment key={comment.time} comment={comment}/>)}
        </div>
    )
}

export default ShowComment;