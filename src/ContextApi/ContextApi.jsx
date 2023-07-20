import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const taskContext = createContext();

const TaskContextProvider = ({ children }) => {

    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || ""
    })

    const [showSidebar, setShowSidebar] = useState(true);
    const [showTaskDescription, setShowTaskDescription] = useState(false);
    const [showTaskDescriptionId, setShowTaskDescriptionId] = useState();
    const [showInboxFilter, setShowInboxFilter] = useState(false);
    const [showTodayFilter, setShowTodayFilter] = useState(false);
    const [showUpcomingFilter, setShowUpcomingFilter] = useState(false);

    const [editMode, setEditMode] = useState(false)

    const [task, setTask] = useState(null)
    const [recentEditHappen, setRecentEditHappen] = useState(false)


    const [currentUrl, setCurrentUrl] = useState('/')

    const [showAddTask, setShowAddTask] = useState(false);

    const url = useLocation();

    useEffect(() => {
        setCurrentUrl(url.pathname)
    }, [url])

    useEffect(() => {
        setUserName(() => {
            return localStorage.getItem('userName') || ""
        })
    }, [])

    return (
        <taskContext.Provider
            value={{
                showSidebar,
                setShowSidebar,
                showTaskDescription,
                showTaskDescriptionId,
                setShowTaskDescription,
                setShowTaskDescriptionId,
                task,
                setTask,
                showInboxFilter,
                setShowInboxFilter,
                showTodayFilter,
                setShowTodayFilter,
                showUpcomingFilter,
                setShowUpcomingFilter,
                editMode,
                setEditMode,
                recentEditHappen,
                setRecentEditHappen,
                currentUrl,
                setCurrentUrl,
                showAddTask,
                setShowAddTask,
                userName, setUserName
            }}>{children}</taskContext.Provider>
    )
}

export const ContextState = () => {
    return useContext(taskContext);
}


export default TaskContextProvider;