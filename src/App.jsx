import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Layouts/Header.jsx'
import TasksList from './Layouts/TasksList.jsx'

import Footer from './Layouts/Footer.jsx'
import './App.css'




export default function App() {
  return (
    <>
      <Header />
      <TasksList />
      <Footer />
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={true} />
    </>
  );
}