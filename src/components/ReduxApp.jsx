import React from 'react';
import { connect } from "react-redux";
import { todolistAPI } from "./../api";
import {addTask,setTodolists,addTodoList} from '../redux/reducer'
import ReduxAppView from './ReduxAppView';

class ReduxApp extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        
        // объявляем наш стейт стартовый
        // this.setState({isFetching: true});

        //instance.get("todo-lists")
        todolistAPI.getTotolists()
        
            .then(res => {
                // this.setState({isFetching: false});
                // this.setState( {todolists: res.data });
                this.props.setTodolists(res.data);
            });
    }


    addTodoList=(title)=>{
        todolistAPI.createTodolist(title)
        .then(res=>{
            debugger
            this.props.addTodoList(res.data.data.item)

        })
        
    }
    render() {
       return <div>
       <ReduxAppView {...this.props} addTodoList={this.addTodoList}/>
       </div>
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addTask: (title) => {
//             let action = {
//                 type: ADD_TASK,
//                 title: title
//             };
//             dispatch(action);
//         },
//         setTodolists: (todolistsFromServer) => {
//             let action = {
//                 type: SET_TODOLISTS,
//                 todolists: todolistsFromServer
//             };
//             dispatch(action);

//         }
//     }
// }

let mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        todolists: state.todolists
    }
}

export default connect(mapStateToProps, {addTask,setTodolists, addTodoList})(ReduxApp);