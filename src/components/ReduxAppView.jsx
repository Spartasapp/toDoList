import React from 'react';
import AddNewItemForm from '../AddNewItemForm';
import ReduxTodoList from './reduxTodoList'



const ReduxAppView = (props)=>{
    return <div>
    <AddNewItemForm addItem={props.addTodoList} />
    {props
        .todolists
        .map(tl => <ReduxTodoList tasks={props.tasks.filter(t=>{
            return t.todoListId === tl.id
        })} id={tl.id} title={tl.title} />)}
</div>
}

export default ReduxAppView;