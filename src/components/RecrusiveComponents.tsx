import React, {FC, ReactNode} from 'react';
import {dateParser} from "../utils/dateParser";
import { observer } from 'mobx-react-lite';
import { Comment } from './Comment';

interface IRecursiveProps {
    data: any,
    getChildren: Function,
}

const RecursiveComponent:FC<IRecursiveProps> = observer(({data,getChildren}) => {
    return (
        <div>
            {data.map((parent:any) => {
                return (
                    <Comment parent={parent} getChildren={getChildren} data={data}/>
                );
            })}
        </div>
    );
});

export default RecursiveComponent;