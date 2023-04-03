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
     childrenFunc (c:any,id:any,data:any) {
         c.map((item:any) => {
            if(item.id === id) {
                return {...item,children: data}
            }
            this.childrenFunc(item,item.id,data)
            return item;
        })
        return c;
    }
  async getCommentsChildren(kids: number[], id: number, children: IComment[]) {
    const data: IComment[] = [];
    if (kids === undefined) return;
    for (const item of kids) {
      const response = await api.get<IComment>(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json`
      );
      data.push(response);
    }
    runInAction(() => {
        this.comments = children.map(item => {
            if(item.id === id) {
                return {...item,children: data}
            }
            return item;
        })
    })
  }
}
export default new Comments();
