import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    todoListId:string
    task:TaskType
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
}


export const Task = React.memo(((props: TaskPropsType) => {


    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }


    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
        console.log('test')
    }

    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)


    return <li key={props.task.id}>
        <Checkbox
            color={'primary'}
            size={'small'}
            checked={props.task.isDone}
            onChange={isDoneHandler}
        />

        <span className={props.task.isDone ? 'is-done' : ''}>
                            <EditableSpan title={props.task.title} changeTitle={changeTaskTitleHandler}/>
                        </span>
        <IconButton color={'primary'}
                    size={'small'}
                    onClick={onClickHandler}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </li>
}))