import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import {
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign : "left",
        margin : 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    },
    button:{
        padding: theme.spacing(2),
        textAlign: 'center',
    }
}));
function handleDelete(id){
    fetch("/todos/"+ id, {
        method: "DELETE",
        headers: {
            "Authorization" : localStorage.getItem("tokenKey"),
        },
    }).catch((err) => console.log(err))
}
function ToDoForm(props) {
    const classes = useStyles();
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isAdd, setIsAdd]= useState(false);
    const [selectedToDo,setSelectedToDo]=useState({});
    const [open,setOpen]=useState(false);
    const [toDoList, setToDoList]=useState([]);

    useEffect(()=>{
        getToDos();
    },[isAdd])

    const saveToDo = () => {
        fetch("/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                userId : localStorage.getItem("currentUser"),
                description : description,
                status: status,
            }),
        })
            .then((res) => {
                res.json()
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getToDos = () => {
        fetch("/todos",)
            .then(res => res.json())
            .then(
                (result) => {
                    setToDoList(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    function updateToDo(){
        fetch("/todos/" + selectedToDo?.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                description : selectedToDo?.description,
                status: selectedToDo?.status,
            }),
        }).then((res) => {
                res.json()
            setIsAdd(!isAdd)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleChange(event,todo){
        setSelectedToDo({...selectedToDo,status:event.target.checked, description:todo.description, id:todo.id, userId:todo.userId})
        updateToDo();
    }

    function handleChangeText(event){
        setSelectedToDo({...selectedToDo, description:event.target.value, status:selectedToDo.status, user:selectedToDo.user})
        updateToDo();
    }

    const handleSubmit = () => {
        setStatus(false);
        saveToDo();
        setIsSent(true);
        setIsAdd(true)
        setDescription("");
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };


    return(
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your Task is added!
                </Alert>
            </Snackbar>
            <div>
                <form >
                    <input
                        placeholder="add new task"
                        className="Input"
                        onChange={(event)=> {
                            setDescription(event.target.value);
                            setStatus(false);

                        }}
                    />
                    <button onClick={handleSubmit} className="Btn">Add Task</button>
                </form>
            </div>
            <div>
                <Paper className={classes.paper}>
                    {
                        toDoList?.map((td)=>{
                            return(
                                <div>
                                    <TextField
                                        value={td.description}
                                        label={td.description}
                                        onChange={(event)=>{
                                            handleChangeText(event);
                                        }}
                                    >
                                        {td.description}
                                    </TextField>
                                    <Checkbox
                                        value={td.status}
                                        onChange = {(event, checked) => {
                                            handleChange(event, td);
                                        }}
                                    />
                                    <button aria-label="delete"
                                            onClick={()=> {
                                                setSelectedToDo(td);
                                                setOpen(true);
                                            }}
                                            className={classes.margin}
                                    >
                                        <DeleteIcon fontSize="large"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </Paper>
            </div>
            <Dialog open={open}>
                <DialogTitle>
                    Task will delete
                </DialogTitle>
                <DialogContent>
                    <button className={classes.button}
                        onClick={()=> {
                        handleDelete(selectedToDo?.id);
                        setOpen(false);
                        setIsAdd(!isAdd);
                    }}> yes </button>
                    <button className={classes.button}
                        onClick={()=>setOpen(false)}> no </button>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default ToDoForm;