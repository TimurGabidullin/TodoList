import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId:string
    filter:FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList:(todoListId: string)=>void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")

    const addTask = (title:string) => {
        props.addTask(title, props.todoListId);
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }


    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListId);
    const onClickRemoveTodoList=()=>{props.removeTodoList(props.todoListId)}

    return <div>
        <h3>
            {props.title}
            <button onClick={onClickRemoveTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>



        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={ onChangeHandler }*/}
        {/*           onKeyPress={ onKeyPressHandler }*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*</div>*/}





        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                    }
                    return <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={isDoneHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}
                    className={props.filter === 'all' ? 'active' : ''}>All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active' : ''}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active' : ''}>Completed
            </button>
        </div>
    </div>
}
