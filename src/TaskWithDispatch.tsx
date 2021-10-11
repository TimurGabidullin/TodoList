import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodoListType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}


export const TaskWithDispatch = React.memo(((props: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListId]
        .filter(task => task.id === props.task.id)[0])

    const dispatch = useDispatch()


    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(task.id, e.currentTarget.checked, props.todoListId)
        dispatch(action)
    }


    const changeTaskTitleHandler = (title: string) => {
        const action = changeTaskTitleAC(task.id, title, props.todoListId)
        dispatch(action)

    }

    const onClickHandler = () => {
        const action = removeTaskAC(task.id, props.todoListId)
        dispatch(action)

    }


    return <li key={task.id}>
        <Checkbox
            color={'primary'}
            size={'small'}
            checked={task.isDone}
            onChange={isDoneHandler}
        />

        <span className={task.isDone ? 'is-done' : ''}>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                        </span>
        <IconButton color={'primary'}
                    size={'small'}
                    onClick={onClickHandler}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </li>
}))