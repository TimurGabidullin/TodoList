import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxStories = Template.bind({});

AppWithReduxStories.args = {};
