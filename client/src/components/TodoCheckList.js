import React, {Fragment, useRef, useEffect} from 'react';
import { XCircleFillIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types';
import marked from 'marked';

import { TASK_COLORS } from '../constants/index'


/**
 * Used to display list of sub-todos to complete with checkbuttons on each todo
 * 
 * @param {array} props.tasks - array of objects containing tasks to complete
 * 
 * @author Eyong Kevin Enowanyo
 */
const TodoCheckList =(props)=>{
    // to use the input object
    const textInput = useRef(null)

    /**
     * Called only when the props.task length changes.
     * It clears the input value only when a successful add tasks was performed
     * 
     * @TODO: It also clears each time this component re-renders. - Need to be fixed to prevent this.
     */
    useEffect(()=>{
        // clear the input value and focus using its ref only when props changes
        textInput.current.value = '';
        textInput.current.focus();
    })

    /**
     * Whenever a button is pressed, check if it's 'Enter' button, then 
     * call a callback if the input value is not zero. Then, clear the input value and focus
     * 
     * @param { object } e - event
     */
    const checkInputPressKey=(e)=>{
        if(e.key === 'Enter'){
            // If the 'Enter' key was pressed

            if(e.target.value.length === 0 ){
                // @TODO: insert error message in an error div
                console.log("Please enter a task")
            }else{
                // Randomly select a color to be set and background color for the task
                const task_color = TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)]
                // call 'addTask' callback
                props.taskCallbacks.addTask(e.target.value, props.todo_id, task_color)
            }
            
        }
    }

    // for each sub-todo, create a template with a checkbotton and a delete icon.
    let tasks = props.tasks.map((task,idx) =>{
        return <li key={`task-${idx}`} className="checklist__task">
            <div className="row" style={{backgroundColor: task.color}}>
                <div className="col-1">
                    <input type="checkbox" checked={task.done} onChange={
                        ()=>props.taskCallbacks.toggleTask(task.todochecklist_id)
                    }  />
                    
                </div>
                <div className="col-9" >
                    <span dangerouslySetInnerHTML={{__html:marked(task.task)}} />
                    
                </div>
                <div className="col-1">
                    <a href="#" onClick={
                        (e)=>props.taskCallbacks.deleteTask(e, task.todochecklist_id)
                    }>
                        <XCircleFillIcon className="checklist__task--remove" />
                    </a>
                </div>
            </div>
            
        </li>
    });

    return(
        <Fragment>
            <div className="checklist">
                <ul className="list-group list-group-flush">
                    {tasks}
                </ul>
                <input type="text"
                    ref={textInput}
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={ checkInputPressKey } />
            </div>
        </Fragment>
    )
}
//TodoCheckList.displayName = "TodoCheckList"
TodoCheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object.isRequired
}

export default TodoCheckList;

