import React, { useState } from 'react';
import { formatTime } from '../../common/helperFunctions';
import { getUser } from '../../common/user';
import CommentForm from '../CommentForm/CommentForm';
import ShowComment from '../ShowComment/ShowComment';
import './Answer.css';

const Answer = ({ answer = {}, accepted, acceptAnswer, askedBy,submitAnswerComment }) => {
    let time = formatTime(answer.time);
    const [onComment, setOnComent] = useState(false);

    const handleClick = () => acceptAnswer(answer._id);

    const handleAnswerComment = (comment) => submitAnswerComment(answer._id, comment);

    return (
        <div className="p-3 answer">
            <span>{answer.answer} </span>
            <span className="meta-data">
                - by {answer.by}  {time} ago
            </span>
            <span className="fl-right">
            {
                accepted && answer.isAccepted ? <span id="tick-mark"></span>
                : !accepted && askedBy === getUser() && <button className="btn btn-success" onClick={handleClick}>Accept</button> 
            }
            </span>
            {answer.comments.length !== 0 ?  <ShowComment comments={answer.comments}/> : ''}
            <p className="comment-btn m-2" onClick={() => setOnComent(!onComment)}>{!onComment ? 'add a comment' : 'Hide'}</p>
            { onComment && <CommentForm handleCommentSubmit={handleAnswerComment}/> }
        </div>
    )
}

export default Answer;