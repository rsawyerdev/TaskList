import { createContext, useState } from 'react';

export const taskListContext = createContext();

const TaskListProvider = (props) => {
    
    const [taskList, setTaskList] = useState();

    return (
        <taskListContext.Provider value={[taskList, setTaskList]}>
            {props.children}
        </taskListContext.Provider>
    );
};

export default TaskListProvider;