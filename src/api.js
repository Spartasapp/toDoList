import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '6fe6cb93-4f38-45a2-8141-96320128cd98'}
});


export const todolistAPI = {
    createTodolist(title) {
        return instance.post("todo-lists", {title});
    },
    getTotolists() {
        return instance.get("todo-lists");
    },
    deleteTodoList(todolistId){
        return instance.delete(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId, title) {
        return instance.post(`todo-lists/${todolistId}/tasks`,
            {title});
    },
    updateTask(task) {
        return instance.put(`todo-lists/tasks`, task);
    },
    deleteTask(taskId){
        return instance.delete(`todo-lists/tasks/${taskId}`);
    }
}

export default instance;