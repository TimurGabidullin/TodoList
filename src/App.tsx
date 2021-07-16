import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType={
    id:string
    title:string
    filter:FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
// BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "NoteBook", isDone: true},
            {id: v1(), title: "Scooter", isDone: false},
            {id: v1(), title: "Car", isDone: true},
            {id: v1(), title: "BTC", isDone: false}
        ]
    });

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(taskId: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListId] = [newTask, ...tasks[todoListId]];
        setTasks({...tasks});
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].map(t => {
            if (t.id === taskID) {
                return {...t, isDone}
            }
            return t
        })
        setTasks({...tasks})
    }

    function changeTodoListFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListId: string){
    setTodoLists(todoLists.filter(tl=>tl.id!==todoListId))
       delete tasks[todoListId]
    }

    function addTodoList(title: string) {
        // const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
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
            <Todolist
                todoListId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                filter={tl.filter}
            />
        )
    })

// UI:

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;
