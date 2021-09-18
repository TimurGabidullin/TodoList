import {TasksStateType, TodoListType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskId: string
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK"
    taskId: string
    title: string
    todoListId: string
}

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {

        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                        ...task,
                        isDone: action.isDone
                    } : task
                )
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                        ...task,
                        title: action.title
                    } : task
                )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todoListId]: []
            }
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    }

}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-STATUS-TASK",
        taskId,
        isDone,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TITLE-TASK",
        taskId,
        title,
        todoListId
    }
}
