import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getUser } from '../../common/user';
import AnswerConatiner from '../AnswerConatiner/AnswerConatiner';
import CommentForm from '../CommentForm/CommentForm';
import Header from '../Header/Header';
import ShowComment from '../ShowComment/ShowComment';
import './ViewQuestion.css'

const ViewQuestion = () => {
    const location = useLocation();
    const [cookies] = useCookies(["user"]);
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const history = useHistory();
    const [onComment, setOnComent] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getQuestionId = () => {
        let path = location.pathname
        return path.substring(path.lastIndexOf('/') + 1, path.length);
    }
    useEffect(()=>{
        let questionId = getQuestionId();
        const fetchQuestion = async () => {
            let response = await callAPI(`http://localhost:3030/question/${questionId}`, {
                token : cookies.user.token
            }, 'POST');
            if(response.status === 200){
                setRequirements(response.question);
            }
        }

        if(!cookies || !cookies.user || !cookies.user.token) history.push('/forum');
        else if(questionId !== 'question'){
            fetchQuestion();
        }
        else history.push('/forum')
    }, [])

    const submitAnswer = async (newAnswer) => {
        setIsLoading(true);
        let by = getUser();
        let response = await callAPI('http://localhost:3030/question/submitAnswer', {
            token : cookies.user.token, 
            questionId : question._id,
            answer : newAnswer,
            by
        }, 'PUT');
        if(response.status === 200){
            window.location.reload();
        }
        setIsLoading(false);
    }

    const acceptAnswer = async (answerId) => {
        setIsLoading(true);
        let response = await callAPI('http://localhost:3030/question/acceptAnswer', {
            token : cookies.user.token, 
            questionId : question._id,
            answerId,
        }, 'PUT');
        if(response.status === 200){
            setAnswers(answers.map(answer => {
                if(answer._id === answerId) answer.isAccepted = true
                return answer
            }));
            setAccepted(true);
        }
        setIsLoading(false);
    }

    const commentQuestion = async (comment) => {
        setIsLoading(true);
        let askedBy = getUser();
        let response = await callAPI(`http://localhost:3030/question/comment/${question._id}`, {
            token : cookies.user.token,
            content : comment,
            askedBy, 
        }, 'PUT');
        if(response.status === 200){
            setRequirements(response.question);
        }
        setIsLoading(false);
    }


    const submitAnswerComment = async (answerId, content) => {
        setIsLoading(true);
        let askedBy = getUser();
        let response = await callAPI(`http://localhost:3030/question/commentAnswer/${question._id}`, {
            token : cookies.user.token,
            answerId,
            content,
            askedBy, 
        }, 'PUT');
        if(response.status === 200){
            setRequirements(response.question);
        }
        setIsLoading(false);
    }

    const setRequirements = (quest) => {
        setQuestion(quest);
        setAnswers(quest.answers);
        setAccepted(quest.accepted);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Header/>
                <div className="question-container">
                    <div className="questions p-4">
                        <span className="question-head">
                            <h3>{question.title}</h3>
                            <span className="meta-data ml-2">by {question.askedBy}</span>
                            <br/>
                        </span>
                        <span>
                            <p className="description">{question.description}</p>
                        </span>
                        {question.comments && question.comments.length !== 0 ?  <ShowComment comments={question.comments}/> : ''}
                        <span className="comment-btn mb-3" onClick={() => setOnComent(!onComment)}>{!onComment ? 'add a comment' : 'Hide'}</span>
                        {onComment && <CommentForm handleCommentSubmit={commentQuestion}/>}
                        <AnswerConatiner submitAnswerComment={submitAnswerComment} askedBy={question.askedBy} accepted={accepted} acceptAnswer={acceptAnswer} allAnswers={answers} submitAnswer={submitAnswer}/>
                    </div>
                </div>
            </>
    )
}

export default ViewQuestion;