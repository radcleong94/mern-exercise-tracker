import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ExerciseList = () => {
    
    const [exercise,setExercise] = useState([])
    
    useEffect(()=>{
        axios.get('http://localhost:5000/exercise')
            .then((res)=>{
                setExercise(res.data);
                console.log(exercise)
            })
            .catch(error =>{
                console.log(error)
            })
    },[])

    const deleteExercise = (id)=>{
        axios.delete('http://localhost:5000/exercise/'+id)
            .then((res)=>{
                console.log(res.data)
                exercise.filter(result => result._id !== id)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    const exerciseData = () =>{
        return exercise.map((user)=>{
            return <ExerciseDataList exercise={user} key={user._id} deleteExercise={deleteExercise} />
        })
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className='table'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseData()}
                </tbody>
            </table>    
        </div>
    )
}

const ExerciseDataList = (props) =>{
        
        return (
            <tr>
                <td>{props.exercise.username}</td>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date.substring(0,10)}</td>
                <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a className='delete-btn' href="/" onClick={() => {props.deleteExercise(props.exercise._id)} }>delete</a>
                </td>
                </tr>
        )
}

export default ExerciseList
