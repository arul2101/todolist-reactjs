import React from "react";

export default function Form() {

    /*===== React State =====*/
    const [input, setInput] = React.useState("");
    const [edit, setEdit] = React.useState({});
    const [todo, setTodo] = React.useState([]);
    /*===== React State =====*/

    /*===== Function Generate Id for Key =====*/
    const generateId = () => Math.floor(Math.random() * 11111);
    /*===== Function Generate Id for Key =====*/

    /*===== Function Handle Submit and Save =====*/
    const handleSubmit = (event) => {
        event.preventDefault();

        /*== Pengkondisian Ketika Tombol Edit diklik ==*/
        if(edit.id) {
            const updatedTodo = {
                id: edit.id,
                activity: input
            }

            const getTodoIndex = todo.findIndex(todo => {
                return todo.id === edit.id;
            })

            const updatedTodos = [...todo];
            updatedTodos[getTodoIndex] = updatedTodo;

            return setTodo(updatedTodos);
        }
        /*== Pengkondisian Ketika Tombol Edit diklik ==*/

        setTodo(prevTodo => {
            return [
                ...prevTodo,
                {
                    id: generateId(),
                    activity: input
                }
            ]
        });
        setInput("");
    };
    /*===== Function Handle Submit and Save =====*/


    /*===== Function Handle Change, Edit, Remove =====*/
    const handleChange = event => { setInput(event.target.value); };

    const editHandle = (todo) => {
        setInput(todo.activity);
        setEdit(todo);
    };

    const cancelEditHandle = () => {
        setInput("");
        setEdit({});
    };
    
    const removeHandle = (todoId) => {
        const filteredTodo = todo.filter(item => {
            return item.id !== todoId;
        });

        setTodo(filteredTodo);

        if(edit.id) {
            cancelEditHandle();
        }
    };
    /*===== Function Handle Change, Edit, Remove =====*/


    const element = todo.map(item => {
        return (
            <div className="list-container" key={item.id}>
                <p>{item.activity}</p>
                <i className="bi bi-pencil-square edit" onClick={editHandle.bind(this, item)}></i>
                <i className="bi bi-trash3-fill remove" onClick={removeHandle.bind(this, item.id)}></i>
            </div>
        );
    });

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="text-add"
                type="text"
                placeholder="Enter Text.."
                onChange={handleChange}
                value={input}
                required
            />
            <button className="button-add">{edit.id ? "Save" : "Add"}</button>
            {edit.id && <i className="bi bi-x-circle cancel-edit" onClick={cancelEditHandle}></i>}
            {element}
        </form>
    );
}