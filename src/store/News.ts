import { makeAutoObservable, runInAction } from "mobx";
import {api} from "../apiService/apiService";

interface INew {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
type NewsStatus = "done" | "pending" | "error";

class News {
  newsIds: number[] = [];
  news:INew[] = [];
  status:NewsStatus = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  async getNewsIds() {
    this.newsIds = [];
    const newsIdsData = await api.get<number[]>("https://hacker-news.firebaseio.com/v0/newstories.json");
    runInAction(() => {
      this.newsIds = newsIdsData.splice(0,100)
    });
  }
  async getNews() {
    const data:INew[] = [];
    for (const item of this.newsIds) {
      const response = await api.get<INew>(`https://hacker-news.firebaseio.com/v0/item/${item}.json`);
      data.push(response);
    }
    runInAction(() => {
      this.news = data;
      this.status = "done";
    });
  }
}
export default new News();
