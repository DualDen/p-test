import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import news from "../store/News";
import {Avatar, List, Spin,Button} from "antd";
import {Link} from "react-router-dom";
import placeholder from "../assets/placeholder.png"
import {dateParser} from "../utils/dateParser";

const Main = observer(() => {
  const statusCheck = () => {
      switch (news.status) {
          case "pending":
              return <Spin size="large"/>;
          case "done":
              return <div>
                <Button onClick={fetchFunc}>Update News</Button>
                 <List
                  itemLayout="horizontal"
                  dataSource={news.news}
                  renderItem={item => (
                      <List.Item>
                          <List.Item.Meta
                              avatar={<Avatar src={placeholder} />}
                              title={<Link to={`/${item.id}`}>{item.title}</Link>}
                              description={`${item.score} points by ${item.by} ${dateParser(item.time)}`}
                          />
                      </List.Item>
                  )}
              />
              </div>
          case "error":
              return <h1>Error...</h1>
      }
  }
  const fetchFunc = async () => {
      if(localStorage.getItem("isFirstRequest") === "false") {
          await news.getNewsIds();
          await news.getNews();
      }
  }
  useEffect(() => {
      fetchFunc()
          const interval = setInterval(() => {fetchFunc()},60000);
      localStorage.setItem("isFirstRequest","false");
      return(() => {
          clearInterval(interval);
      })
  }, []);
  return (
    <div className="container">
        {statusCheck()}
    </div>
  );
});

export default Main;
