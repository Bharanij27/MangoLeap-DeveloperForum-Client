import React, { useState } from 'react';
import Answer from '../Answer/Answer';

const AnswerConatiner = ({ allAnswers = [], submitAnswer, accepted, acceptAnswer, askedBy,submitAnswerComment }) => {
    const [newAnswer, setNewAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newAnswer.trim().length) { 
            submitAnswer(newAnswer);
            setNewAnswer('');
        }
    }

    return (
        <>
            <div className="m-1 mt-2 border-bottom-black">
                <span> 
                    <p>{allAnswers.length} Answers </p>
                </span>
            </div>
            <div className="answer-container m-3">
            {
                allAnswers.map(answer => {
                    return <Answer submitAnswerComment={submitAnswerComment} acceptAnswer={acceptAnswer} askedBy={askedBy} accepted={accepted} key={answer._id} answer={answer}/>
                })
            }
            </div>
            <form className="mt-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <textarea onChange={(e) => setNewAnswer(e.target.value)} className="form-control" id="answer" placeholder='Your Answer...' required={true}/>
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AnswerConatiner;