import {makeAutoObservable, runInAction} from "mobx";
import {api} from "../apiService/apiService";

export interface IComment {
  id: number;
  kids: number[];
  children?: IComment[];
  parent?: number;
  text: string;
  by: string;
  type: string;
  time: number;
}

class Comments {
  comments: IComment[] = [];
  status: string = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  async getComments(kids: number[]) {
    const data: IComment[] = [];
    if (kids === undefined) return;
    for (const item of kids) {
      const response = await api.get<IComment>(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json`
      );
      data.push(response);
    }
    runInAction(() => {
      this.comments = data;
      this.status = "done";
    });
  }
  async getCommentsChildren(kids: number[], id: number, children: IComment[]) {
    const data: IComment[] = [];
    if(kids === undefined) return;
    for (const item of kids) {
      const response = await api.get<IComment>(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json`
      );
      data.push(response);
    }
    const recursFunc = (comments:IComment[]) => {
      for(let i = 0; i < comments.length!; i++) {
        if(comments[i].id === id) {
          comments[i].children = data;
          recursFunc(children)
        }
      }
      return comments;
    }
    runInAction(() => {
      this.comments = recursFunc(children);
    })
  }
  setNullComments () {
    this.comments = [];
  }
}
export default new Comments();
