import React from 'react';
import '../App.css';
import TodoListTasks from "../TodoListTasks";
import TodoListFooter from "../TodoListFooter";
import TodoListTitle from "../TodoListTitle";
import AddNewItemForm from "../AddNewItemForm";
import preloader from "../preloader.svg";


const ReduxTodoListView = (props)=>{
    
    const onDeleteTodolist = ()=>{
        props.deleteTodolist(props.id)
    }
    return <div className="todoList">
    <div className="todoList-header">
        <TodoListTitle title={props.title}/>
        <AddNewItemForm addItem={props.addTask}/>
    </div>

    {props.state.isFetching
        ? <img src={preloader} alt=''/>
        : <TodoListTasks deleteTask={props.deleteTask} changeStatus={props.changeStatus}
                         changeTitle={props.changeTitle}
                         tasks={props.tasks.filter(t => { 
                             
                             if (props.state.filterValue === "All") {
                                 return true;
                             }
                             if (props.state.filterValue === "Active") {
                                 return t.status !== 2;
                             }
                             if (props.state.filterValue === "Completed") {
                                 return t.status === 2;
                             }
                         })}/>
    }
    <TodoListFooter changeFilter={props.changeFilter} filterValue={props.state.filterValue}/>
    <button onClick={onDeleteTodolist}>Delete</button>
</div>
}

export default ReduxTodoListView;
    