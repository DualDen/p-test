import React,{FC} from 'react';
import { IComment } from '../store/Comments';
import RecursiveComponent from  "./RecrusiveComponents"
import { dateParser } from '../utils/dateParser';
import { observer } from 'mobx-react-lite';

interface ICommentProps {
    data: IComment[]
    parent: IComment;
    getChildren: Function
}

export const Comment:FC<ICommentProps> = observer(({parent,getChildren,data}) => {
    return (
        <ul className="list" key={parent.id}>
                        <li>
                        <div onClick={() => {getChildren(parent.kids,parent.id,data)}}>{parent.by}</div>
                        <div>{parent.text}</div>
                        <div>{dateParser(parent.time)}</div>
                        <div>
                            {parent.children && <RecursiveComponent data={parent.children} getChildren={getChildren} />}
                        </div>
                        </li>
                    </ul>
    )
})