import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

const changeTaskStatusCallback = action('Change Task Status')
const changeTaskTitleCallback = action('Change Task Title')
const removeTaskCallback = action('Remove Task')

export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
        removeTask: removeTaskCallback,
    },
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    todoListId: 'todo1',
    task: {
        id: '1',
        isDone: true,
        title: 'REDUX',
    }
};

export const TaskIsNotDone = Template.bind({});


TaskIsNotDone.args = {
    todoListId: 'todo1',
    task: {
        id: '2',
        isDone: false,
        title: 'JS',
    }
};
