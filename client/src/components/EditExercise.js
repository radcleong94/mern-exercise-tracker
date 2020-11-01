import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useParams} from 'react-router-dom'
import axios from 'axios';

const EditExercise = () => {

    const [username,setUsername] = useState('');
    const [description,setDescription] = useState('');
    const [duration,setDuration] = useState(0)
    const [date,setDate] = useState(new Date());
    const [users,setUsers] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:5000/exercise/'+id)
            .then((res)=>{
                setUsername(res.data.username);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date))
            })
            .catch(err =>{
                console.log(err)
            })

        

        axios.get('http://localhost:5000/users')
           .then((res)=>{
               if(res.data.length > 0 ){
                   setUsers(res.data.map((user)=> user.username))
               }
           })
           .catch(err =>{
               console.log('error')
           })
    },[id])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    }

    const onChangeDate = (date) => {
        setDate(date);
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        }

        axios.post('http://localhost:5000/exercise/update/'+id,exercise)
            .then((res)=>{
                console.log(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
           console.log(exercise)
        window.location = '/'; 
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username:</label>
                    <select required
                    className='form-control' 
                    value={username}
                    onChange={onChangeUsername}
                    >
                        {users.map((user)=>{
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type='text' 
                    required
                    className='form-control' 
                    value={description}
                    onChange={onChangeDescription}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (minutes):</label>
                    <input type='text' 
                    required
                    className='form-control' 
                    value={duration}
                    onChange={onChangeDuration}
                    />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-primary'>Edit Exercise Log</button>
                </div>
            </form>
        </div>
    )
}

export default EditExercise
