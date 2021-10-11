import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskWithDispatch} from "./TaskWithDispatch";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('tl')
    // let [title, setTitle] = useState("")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId);
    }, [props.addTask, props.todoListId])

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }


    const onAllClickHandler = useCallback(() => props.changeTodoListFilter("all", props.todoListId), [props.changeTodoListFilter,props.todoListId]);
    const onActiveClickHandler = useCallback(() => props.changeTodoListFilter("active", props.todoListId), [props.changeTodoListFilter,props.todoListId]);
    const onCompletedClickHandler = useCallback(() => props.changeTodoListFilter("completed", props.todoListId), [props.changeTodoListFilter,props.todoListId]);

    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListId),[props.removeTodoList])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListId),[props.changeTodoListTitle,props.todoListId])


    let allTodoListTasks = props.tasks
    let tasksForTodolist = allTodoListTasks

    if (props.filter === "active") {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

            <IconButton color={'primary'}
                        size={'small'}
                        style={{color: "black"}}
                        onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>


        <ul style={{listStyle: 'none', paddingLeft: '0'}}>
            {
                tasksForTodolist.map(t => {

                    return (
                        <Task task={t}
                                 todoListId={props.todoListId}
                                 removeTask={props.removeTask}
                                 changeTaskStatus={props.changeTaskStatus}
                                 changeTaskTitle={props.changeTaskTitle}
                                 key={t.id}/>

                    // <TaskWithDispatch task={t} todoListId={props.todoListId} key={t.id}/>

                    )

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
                style={{margin: '0 3px'}}
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
})
