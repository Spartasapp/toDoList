export const ADD_TASK = 'ADD-TASK';
export const SET_TODOLISTS = 'SET-TODOLISTS';
export const SET_TODOLIST_TASKS = 'SET-TODOLIST-TASKS';
export const UPDATE_TASKS = 'UPDATE-TASKS';
export const ADD_TODOLIST = 'ADD-TODOLIST';
export const DELETE_TODOLIST = 'DELETE-TODOLIST';
export const DELETE_TASK = 'DELETE-TASK';

const initialState = {
    todolists: [],
    tasks: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            let stateCopy = { ...state };
            stateCopy.tasks = [...state.tasks,
            { title: action.title }];
            return stateCopy;


        case SET_TODOLIST_TASKS:
            let statyCopy = { ...state };
            statyCopy.tasks = [...state.tasks,
            ...action.tasks];
            return statyCopy;

        case UPDATE_TASKS:
            let statCopy = { ...state };
            statCopy.tasks = [
                ...action.tasks];
            return statCopy;
        case ADD_TODOLIST:

            let newTodoLists = [...state.todolists, action.newTodolist]
            return { ...state, todolists: newTodoLists };
        case SET_TODOLISTS:
            let stataCopy = { ...state };
            stataCopy.todolists = [...state.todolists, ...action.todolists];
            return stataCopy;
        // return {
        //     ...state, 
        //     todolists: [...state.todolists, ...action.todolists]
        // }
        case DELETE_TODOLIST:
            let newdelTodoLists = state.todolists.filter(tl => {
                return tl.id !== action.todolistId
            })
            return { ...state, todolists: newdelTodoLists };
        case DELETE_TASK:
            debugger
            let newdelTasks = state.tasks.filter(tl => {
                return tl.id !== action.taskId
            })
            return { ...state, tasks: newdelTasks }

        default:
            return state;
    }
}




// export const addTask =  (title) => {
//     let action = {
//         type: ADD_TASK,
//         title: title
//     };
//     return action;
// };
export const deleteTodoList = (todolistId) => ({ type: DELETE_TODOLIST, todolistId })
export const addTodoList = (newTodolist) => ({ type: ADD_TODOLIST, newTodolist })
export const addTask = (title) => ({ type: ADD_TASK, title });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId })
export const setTodolists = (todolistsFromServer) => {
    let action = {
        type: SET_TODOLISTS,
        todolists: todolistsFromServer
    };
    return action;
};
export const setTasks = (todotasksFromServer) => {
    let action = {
        type: SET_TODOLIST_TASKS,
        tasks: todotasksFromServer
    };
    return action;

};
export const changeTask = (updateTaskOnServer) => {
    let action = {
        type: UPDATE_TASKS,
        tasks: updateTaskOnServer
    };
    return action;
};
export default reducer;