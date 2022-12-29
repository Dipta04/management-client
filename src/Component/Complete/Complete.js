import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';


const Complete = () => {
    
    const navigate = useNavigate();
    const location =useLocation();
    const from = location.state?.from?.pathname || '/mytask';

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://management-server-sigma.vercel.app/addtasks')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log('received', data)
                setTasks(data);
            })
    }, [])

    const handleDelete = id => {
        fetch(`https://management-server-sigma.vercel.app/addtasks/${id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.deletedCount > 0) {
                toast.success(`Product deleted successfully`);
                const remaining = tasks.filter(odr => odr._id !== id);
                setTasks(remaining);
            }
        })
    }

    const handleNotCompleted = id => {
        fetch(`https://management-server-sigma.vercel.app/addtasks/notcomplete/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
               if(data.modifiedCount > 0){
                toast.success('Added to My Task successful.');
                navigate(from, {replace: true});
               }
            })
    }


    return (
        <div className="container p-2 mx-auto mt-10 mb-64 sm:p-4 text-gray-800">
            <h2 className="mb-10 text-4xl font-bold leading-tight">Completed Task</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="p-3 font-bold">Task Name</th>
                            <th className="p-3 font-bold">Date</th>
                            <th className="p-3 font-bold">Description</th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            <th className="p-3">Comment</th>

                        </tr>
                    </thead>
                    <tbody>

                        {

                            tasks.map((task, i) =>
                                  task.complete === 'complete' && task.notcomplete !== 'notcomplete' &&

                                <tr className="border-b border-opacity-20 border-gray-700 bg-gray-800">
                                    <td className="p-3">
                                        <p className="text-white font-bold">{task.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p className="text-white font-bold">{task.date}</p>
                                    </td>
                                    <td className="p-3">

                                        <p className="text-white font-bold">{task.description}</p>
                                    </td>
                                    <td className="p-3">

                                        <button onClick={() => handleDelete(task._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => handleNotCompleted(task._id)} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                                           Not Completed
                                        </button>
                                    </td>
                                    <td>
                                        <input type="text" placeholder='comment section' className='text-center rounded'/>
                                    </td>
                                </tr>
                               
                            )

                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Complete;