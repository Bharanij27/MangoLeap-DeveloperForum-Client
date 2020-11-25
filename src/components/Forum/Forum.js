import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getUser } from '../../common/user';
import ForumContainer from '../ForumContainer/ForumContainer';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import './Forum.css'

const Forum = () => {

    const [active, setActive] = useState('All');
    const [cookies] = useCookies(["user"]);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        (!cookies.user || !cookies.user.token) && history.push("/");
        setIsLoading(true);
        
        const getQuestions = async () => {
            let response = await callAPI('https://developer-forum-server.herokuapp.com/question/', {token : cookies.user.token}, 'POST');
            if(response.status === 200) {
                setQuestions(response.questions);
                setAllQuestions(response.questions)
            }
            setIsLoading(false)
        }

        getQuestions();
    },[]);

    useEffect(()=>{
        let cur_user = getUser();

        if(active === 'UnAnswered') setQuestions(allQuestions.filter(question => !question.answers.length));
        else if(active === 'Asked') setQuestions(allQuestions.filter(question => question.askedBy === cur_user));
        else setQuestions(allQuestions)
    }, [active]);

    return (
        <>
            {isLoading ? <Loading/> :
            <>
                <Header/>
                <div className="forum-container mt-5 row">
                <div className="col-7">
                    <button className='btn btn-primary' onClick={()=> history.push("/ask")}> Ask a Question </button>
                </div>
                <div className="grid ai-center jc-space-between col-5">
                    <button className={active ==='All' ? 'active btn btn-light' : 'btn btn-light'} onClick={()=> setActive('All')}> All </button>
                    <button className={active ==='UnAnswered' ? 'active btn btn-light' : 'btn btn-light'} onClick={()=> setActive('UnAnswered')}> UnAnswered </button>
                    <button className={active ==='Asked' ? 'active btn btn-light' : 'btn btn-light'} onClick={()=> setActive('Asked')}> Asked </button>
                </div>
                </div>
                    <ForumContainer questions={questions}/>
            </>
        }
    </>
    )
}

export default Forum;