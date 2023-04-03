import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import news from "../store/News";
import {dateParser} from "../utils/dateParser";
import comments, {IComment} from "../store/Comments";
import {observer} from "mobx-react-lite";
import {Avatar, List} from "antd";
import placeholder from "../assets/placeholder.png";
import RecursiveComponent from "../components/RecrusiveComponents";

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
        getComments();
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