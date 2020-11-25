import React from 'react';
import Question from '../Question/Question';
import './ForumContainer.css'

const ForumContainer = ({ questions }) => {

    return (
        <>
            <div className="question-container">
                <div className="questions">
                    {questions.length ? 
                    <ul>
                        {questions.map((question) => {
                            return <Question key={question._id} question = {question}/>}
                        )}
                    </ul> : <div className="text-center">No Post</div>}
                </div>
            </div>
        </>
    )
}

export default ForumContainer;