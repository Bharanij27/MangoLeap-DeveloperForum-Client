import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatTime } from '../../common/helperFunctions';
import './Question.css'

const Question = ({ question }) => {
    const time = formatTime(question.time);
    const history = useHistory();

    const viewQuestion = () => {
        history.push(`/question/${question._id}`);
    }
    return (
        <>
            <li className="question">
                {/* <span className="score">{question.accepted}</span> */}
                <span onClick={viewQuestion}>
                    <h4 className="title">{question.title}</h4>
                </span>
                <br/>
                <span className="author meta-data">by {question.askedBy}</span>
                <span className="time meta-data ml-2">{time} ago</span>
                <span className="answer-small meta-data ml-2">{question.answers.length} Answers</span>
            </li> 
        </>
    )
}

export default Question;