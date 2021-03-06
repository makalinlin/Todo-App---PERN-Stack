import React, { Fragment} from 'react';
import PropTypes from 'prop-types'

import TodoCard from './TodoCard';
import { STATUS } from '../constants'

/* const titlePropType = (props, propName, componentName)=>{
    if(props[propName]){
        let notString = '';
        let lenLongerThan80 = '';
        let value = props[propName];
        if(typeof value !== 'string')
            notString = "Not a string";
        if(value.length > 11)
            lenLongerThan80 = "Longer than 80";
        if(notString.length || lenLongerThan80.length)
            return new Error(
                `${propName} in ${componentName} is: ${notString}, ${lenLongerThan80}`
            )
        
    }
} */

/**
 * Creates a list of todos
 * 
 * @param { str } props.title - status of the todo
 * @param { array } props.todo - array containing our todos.
 * @param { array } props.tasks - array containing all tasks
 * @param { object } props.taskCallbacks - object of callback functions to change the state.
 * 
 * @author Eyong Kevin Enowanyo
 */
const ListTodos = (props) =>{
    const { title, todo, tasks } = props
    // Create an array of todo cards with all its tasks. A card display all details of a single todo
    let cards = todo.map((card) =>{
        // get all tasks belonging to this card
        const todoTasks = tasks.filter((task) => task.task_id === card.todo_id)
        return <TodoCard key={card.todo_id} card={card} todoTasks={todoTasks} taskCallbacks={props.taskCallbacks} />             
    });

    return(
        <Fragment>
            <div className="list">
                <h1>{title}</h1>
                {cards}
            </div>
            
        </Fragment>
    )
}


ListTodos.propTypes = {
    title: PropTypes.oneOf(STATUS),
    todo: PropTypes.arrayOf(PropTypes.shape({
        todo_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        done_timestamp: PropTypes.string
    })).isRequired,
    tasks: PropTypes.array,
    id: PropTypes.string,
    taskCallbacks: PropTypes.object.isRequired
}

export default ListTodos;

