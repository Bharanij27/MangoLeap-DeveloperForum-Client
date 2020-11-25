import React, { useState } from 'react';

const CommentForm = ({ handleCommentSubmit }) => {
    const [comment, setComment] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        if(comment.trim().length){
            handleCommentSubmit(comment);
            setComment('');
        }        
    }
    
    return(
        <form className="mt-2">
            <div className="form-group">
                <textarea onChange={(e) => setComment(e.target.value)} className="form-control" id="comment" placeholder='Comment your thoughts' required={true}/>
            </div>
            <button type="submit" className="btn btn-sm btn-primary" onClick={(e) => handleClick(e)}>Comment</button>
        </form>
    )
}

export default CommentForm;