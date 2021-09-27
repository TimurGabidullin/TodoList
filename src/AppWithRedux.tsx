import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function MenuIcon() {
    return null;
}

function AppWithRedux() {
// BLL:
//     const todoListID_1 = v1()
//     const todoListID_2 = v1()
//     const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
//         {id: todoListID_1, title: 'What to learn', filter: 'all'},
//         {id: todoListID_2, title: "What to buy", filter: 'all'}
//     ])

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListID_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false}
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: "Books", isDone: false},
    //         {id: v1(), title: "NoteBook", isDone: true},
    //         {id: v1(), title: "Scooter", isDone: false},
    //         {id: v1(), title: "Car", isDone: true},
    //         {id: v1(), title: "BTC", isDone: false}
    //     ]
    // });

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(taskId: string, todoListId: string) {

        let action=removeTaskAC(taskId, todoListId)
        dispatch(action);
    }

    function addTask(title: string, todoListId: string) {

        let action=addTaskAC(title, todoListId)
        dispatch(action);
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListId: string) {

        let action = changeTaskStatusAC(taskID, isDone, todoListId)
        dispatch(action);
    }

    function changeTaskTitle(taskID: string, title: string, todoListId: string) {
        let action = changeTaskTitleAC(taskID, title, todoListId)
        dispatch(action);
    }

    function changeTodoListFilter(value: FilterValuesType, todoListId: string) {
        let action = ChangeTodoListFilterAC(value, todoListId)
        dispatch(action)
    }

    function removeTodoList(todoListId: string) {
        let action = RemoveTodoListAC(todoListId)
        dispatch(action)

    }

    function addTodoList(title: string) {
        // const newTodoListId = v1()
        // const newTodoList: TodoListType = {
        //     id: v1(),
        //     title: title,
        //     filter: 'all'
        // }
        let action = AddTodoListAC(title)
        dispatch(action)
        // dispatchToTasks({...tasks, [newTodoList.id]: []})



    }

    function changeTodoListTitle(title: string, todoListId: string) {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action)
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        removeTodoList={removeTodoList}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>
        )
    })

// UI:

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        color="inherit"
                        variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
