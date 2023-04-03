import React, {FC, ReactNode} from 'react';
import {dateParser} from "../utils/dateParser";

interface IRecursiveProps {
    data: any,
    getChildren: Function,
}

const RecursiveComponent:FC<IRecursiveProps> = ({data,getChildren}) => {
    return (
        <div>
            {data.map((parent:any) => {
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
                );
            })}
        </div>
    );
};

export default RecursiveComponent;