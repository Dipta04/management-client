import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Route/Route';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './Component/AuthProvider/AuthProvider';

function App() {
  const {theme} = useContext(AuthContext);
  return (
    <div className={`App${theme} text-center`}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
    </div>
  );
}

export default App;
