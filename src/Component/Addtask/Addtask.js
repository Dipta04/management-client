import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Addtask = () => {

   const navigate = useNavigate();

   const handleAddTask = event =>{
    event.preventDefault();
    const form = event.target;
    const file = form.files.value;
    const name = form.name.value;
    const date = form.date.value;
    const description = form.description.value;

    const addTask = {
        file,
        name,
        date,
        description
    }
    fetch('http://localhost:5000/addtasks',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addTask)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.acknowledged) {
            toast.success('Products added successfully');
            // refetch();
            // navigate('/dashboard/myproduct');
        }

    })
   }


    return (
        <div>
            <div className="w-full mx-auto my-10 max-w-md p-4 rounded-md shadow sm:p-8  text-gray-100">
            <h2 className="mb-3 text-3xl font-semibold text-center text-gray-800">Add Your Task</h2>
                <form  onSubmit={handleAddTask} novalidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">

                        <fieldset className="w-full space-y-1 text-gray-500">
                            <div className="flex">
                                <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" />
                            </div>
                        </fieldset>

                        <div className="space-y-2">
                            <input type="text" name="name" id="name" placeholder="Task Name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="date" id="date" placeholder="Last Date" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                        <div className="space-y-2">
                            <div className="">
                            </div>
                            <input type="text" name="description" id="description" placeholder="Task Description" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Submit</button>
                </form>
            </div>


        </div>
    );
};

export default Addtask;