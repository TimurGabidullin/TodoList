import {
    ActionsType, AddTodoListAC, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT,
    RemoveTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';




let todolistId1 :string;
let todolistId2 :string;

let startState: Array<TodoListType>

beforeEach(()=>{

     todolistId1 = v1();
     todolistId2 = v1();

  startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe("What to buy");
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleAT = ChangeTodoListTitleAC(newTodolistTitle, todolistId2);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action :ChangeTodoListFilterAT= {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId: todolistId2,
        value: newFilter
    };

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


