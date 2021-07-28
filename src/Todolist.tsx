import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
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
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) =>props.changeTodoListTitle(title,props.todoListId)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

            <IconButton color={'primary'}
                        size={'small'}
                        style={{color:"black"}}
                        onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>



        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={ onChangeHandler }*/}
        {/*           onKeyPress={ onKeyPressHandler }*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*</div>*/}


        <ul style={{listStyle: 'none', paddingLeft: '0'}}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListId)
                    }

                    return <li key={t.id} >
                        <Checkbox
                            color={'primary'}
                            size={'small'}
                            checked={t.isDone}
                            onChange={isDoneHandler}
                        />




                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    checked={t.isDone}*/}
                        {/*    onChange={isDoneHandler}*/}
                        {/*/>*/}
                        {/*<span>{t.title}</span>*/}

                        <span className={t.isDone ? 'is-done' : ''}>
                            <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        </span>
                        <IconButton color={'primary'}
                                    size={'small'}
                                    onClick={onClickHandler}>
                            <Delete fontSize={'small'}/>
                        </IconButton>

                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                size={'small'}
                variant={'contained'}
                color={props.filter === 'all' ? 'secondary' : 'primary'}
                // className={props.filter === 'all' ? 'active' : ''}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style={{margin:'0 3px'}}
                size={'small'}
                variant={'contained'}
                color={props.filter === 'active' ? 'secondary' : 'primary'}
                // className={props.filter === 'active' ? 'active' : ''}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={'small'}
                variant={'contained'}
                color={props.filter === 'completed' ? 'secondary' : 'primary'}
                // className={props.filter === 'completed' ? 'active' : ''}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
