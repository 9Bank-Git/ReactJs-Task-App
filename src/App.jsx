import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Layouts/Header.jsx'
import TasksList from './Layouts/TasksList.jsx'
import Footer from './Layouts/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <TasksList />
      <Footer />
      <ToastContainer autoClose={4000} hideProgressBar={true} pauseOnHover/>
    </>
  );
}