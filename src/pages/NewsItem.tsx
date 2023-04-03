import React, {useEffect} from 'react';
import { useParams} from "react-router-dom";
import news from "../store/News";
import {dateParser} from "../utils/dateParser";
import comments, {IComment} from "../store/Comments";
import {observer} from "mobx-react-lite";
import RecursiveComponent from "../components/RecrusiveComponents";
import {Button} from "antd"

const NewsItem = observer(() => {
    const params = useParams();
    const id = Number(params.id);
    const newsItem = news.news.find(item => item.id === id);
    const getComments = async () => {
        await comments.getComments(newsItem?.kids!)
    }
    const getCommentsChildren = async (kids:number[],id:number,children:IComment[]) => {
       await comments.getCommentsChildren(kids,id,children);
    }

    useEffect(() => {
        comments.setNullComments();
        getComments();
        const interval = setInterval(() => {
            getComments();
        },60000)
        return(() => {
            clearInterval(interval)
        })
    },[])
    const newsItemCheck = () => {
        if(!newsItem) return <h1>News item not found</h1>;

        return (
            <div className="container">
                <div className="news-title">{newsItem.title}</div>
                <a href={newsItem.url} target="_blank" className="news-url">To the news page</a>
                <div className="newsDA">
                <div className="news-date">{dateParser(newsItem.time)}</div>
                <div className="news-author">by {newsItem.by}</div>
                <Button onClick={getComments}>Update comments</Button>
                    <div className="comments-counter">Comments: {newsItem.descendants}</div>
                </div>
                {comments.status === "done" && <RecursiveComponent data={comments.comments} getChildren={getCommentsChildren}/>}
            </div>
        )
    };

    return (
        newsItemCheck()
    );
});

export default NewsItem;