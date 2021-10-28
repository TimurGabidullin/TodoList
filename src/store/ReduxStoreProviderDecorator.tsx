import {store} from "./store";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import React from "react";


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider
    store={store}>{storyFn()}
</Provider>