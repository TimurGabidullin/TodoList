import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title:string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const errorMessage = 'Title is required!'

    const addItem = () => {
        const trimmedTitle = title.trim()
        trimmedTitle ? props.addItem(trimmedTitle) : setError(true)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'title'}
                variant={'outlined'}
                error={error}
                helperText={error&&errorMessage}
            />

            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*    // className={error ? 'error' : ''}*/}
            {/*       style={error ? {border: '2px solid red'} : {}}*/}
            {/*/>*/}
            <IconButton size={'small'}
                        onClick={addItem}
                        color={"primary"}>
                <AddBox fontSize={'large'}/>
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div style={{color: 'red'}}>'Title is required!</div>}*/}
            {/*<div style={error ? {color: 'red'} : {display: 'none'}}>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}

        </div>

    )
}


export default AddItemForm