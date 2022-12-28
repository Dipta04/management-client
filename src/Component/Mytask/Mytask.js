import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Mytask = () => {

    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/addtasks')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log('received', data)
                setTasks(data);
            })
    }, [])

    const handleDelete = id => {
        fetch(`http://localhost:5000/addtasks/${id}`,{
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

    const handleCompleted = id => {
        fetch(`http://localhost:5000/addtasks/complete/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
               if(data.modifiedCount > 0){
                toast.success('Completed Task successful.')
               }
            })
    }

    return (

        <div className="container p-2 mx-auto mt-10 mb-64 sm:p-4 text-gray-800">
            <h2 className="mb-10 text-4xl font-bold leading-tight">My Task</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="p-3 font-bold">Task Name</th>
                            <th className="p-3 font-bold">Date</th>
                            <th className="p-3 font-bold">Description</th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            
                            tasks.map((task, i) =>

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

                                        <button onClick={() => handleDelete(task._id)} class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => handleCompleted(task._id)} class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                                            Completed
                                        </button>
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

export default Mytask;