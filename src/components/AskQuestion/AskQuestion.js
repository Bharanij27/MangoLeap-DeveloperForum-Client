import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getUser } from '../../common/user';
import Header from '../Header/Header';
import './AskQuestion.css';

const AskQuestion = () => {
   
    let formData = {title : '', description: ''}
    const [question, setQuestion] = useState(formData);
    const [cookies] = useCookies(["user"]);
    const history = useHistory();

    useEffect(() => {
        (!cookies.user || !cookies.user.token) && history.push("/");
    }, []);
    
    const handleChange = (e, id) => {
        setQuestion({...question, [id] : e.target.value})
    }
    
    const postQuestion = async (e) => {
        e.preventDefault();
        let name = getUser();
        debugger
        let response = await callAPI("https://developer-forum-server.herokuapp.com/question/new", { token : cookies.user.token, ...question, askedBy : name }, 'POST');
        if(response.status === 200){
            alert('Query Posted')
            setQuestion({...formData});
        }
    }

    return (
    <>
        <Header/>
        <div className="container mt-5 question-section">
            <form className="p-5" onSubmit={(e) => postQuestion(e)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={question.title} onChange={(e) => handleChange(e, 'title')} className="form-control" id="title" required={true}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={question.description} onChange={(e) => handleChange(e, 'description')} className="form-control" id="description" required={true} rows={5} cols={5}/>
                </div>
                <button type="submit" className="btn btn-primary">POST</button>
            </form>
        </div>
    </>
    )
}

export default AskQuestion;
