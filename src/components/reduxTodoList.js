import React from 'react';
import '../App.css';
import  {todolistAPI} from "../api";
import { connect } from "react-redux";
import {setTasks,changeTask,deleteTodoList,deleteTask} from '../redux/reducer'
import ReduxTodoListView from './ReduxTodoListView';

class ReduxTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    }

    restoreState = () => {
        this.setState({isFetching: true});
        todolistAPI.getTasks(this.props.id)
            .then(res => {
            
                this.setState({isFetching: false});
                this.props.setTasks(res.data.items);
            });
    }

    state = {
        filterValue: "All",
        isFetching: false
    };

    addTask = (newText) => {
        todolistAPI.createTask(this.props.id, newText)
            .then(res => {
                let newTask = res.data.data.item;
                this.props.setTasks([newTask])//task, который создался на серваке и вернулся нам
                // this.setState({tasks: [...this.state.tasks, newTask]});
            });

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    }

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find(t => t.id === taskId);
        let newTask = {...task, ...obj};
        todolistAPI.updateTask(newTask)
            .then( res => {
                

                let newTasks = this.props.tasks.map(t => {
                    if (t.id !== taskId) {
                        return t;
                    } else {
                        return newTask;
                    }
                });
                this.props.changeTask(newTasks)
                // this.setState({
                //     tasks: newTasks
                // }, () => {
                //     this.saveState();
                // });
            })
    }
    deleteTask = (taskId)=>{
        todolistAPI.deleteTasks(taskId)
        .then( res =>{
            debugger
            this.props.deleteTask(taskId)
        })
    }
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }
    deleteTodolist = (todolistId)=>{
        todolistAPI.deleteTodoList(todolistId)
        .then(res=>{
            
            this.props.deleteTodoList(todolistId)
        })
    }
    render = () => {
        
        return (
            <div className='todolistStyle'>
                <ReduxTodoListView deleteTask={this.deleteTask} deleteTodolist={this.deleteTodolist} {...this.props} 
                addTask={this.addTask}
                state={this.state} changeStatus={this.changeStatus} changeTitle={this.changeTitle}/>
                
            </div>
            

        );
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         setTasks: (todotasksFromServer) => {
//             let action = {
//                 type: SET_TODOLIST_TASKS,
//                 tasks: todotasksFromServer
//             };
//             dispatch(action);

//         },
//         changeTask: (updateTaskOnServer) =>{
//             let action = {
//                 type: UPDATE_TASKS,
//                 tasks: updateTaskOnServer
//             };
//             dispatch(action);
//         }
//     }
// }

let mapStateToProps = (state) => {
    return {
    //    tasks: state.tasks
    }
}

export default connect(mapStateToProps, {setTasks,changeTask,deleteTodoList,deleteTask})(ReduxTodoList);


