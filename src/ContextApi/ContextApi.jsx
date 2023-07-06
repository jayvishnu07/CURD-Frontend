import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const taskContext = createContext();

const TaskContextProvider = ({ children }) => {

    const location = useLocation();

    const [showSidebar, setShowSidebar] = useState(true);
    const [showTaskDescription, setShowTaskDescription] = useState(false);
    const [showTaskDescriptionId, setShowTaskDescriptionId] = useState();
    const [showFilter, setShowFilter] = useState(false);

    const [task, setTask] = useState(null)

    useEffect(() => {
        console.log("showFilter = > " + showFilter);
    }, [showFilter])

    return (
        <taskContext.Provider value={{ showSidebar, setShowSidebar, showTaskDescription, showTaskDescriptionId, setShowTaskDescription, setShowTaskDescriptionId, task, setTask, showFilter, setShowFilter }}>{children}</taskContext.Provider>
    )
}

export const ContextState = () => {
    return useContext(taskContext);
}


export default TaskContextProvider;