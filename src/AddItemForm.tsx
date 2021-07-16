import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                // className={error ? 'error' : ''}
                   style={error ? {border: '2px solid red'} : {}}
            />
            <button onClick={addItem}>+</button>
            {/*{error && <div style={{color: 'red'}}>'Title is required!</div>}*/}
            <div style={error ? {color: 'red'} : {display: 'none'}}>
                {errorMessage}
            </div>

        </div>

    )

}


export default AddItemForm