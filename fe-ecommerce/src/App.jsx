import { ToastContainer } from 'react-toastify'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllCategoriesAction } from './features/category/categoryAction'
import { fetchAllProductAction } from './features/product/productAction'
import { ModalWrapper } from './component/modalWrapper/ModalWrapper'


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllCategoriesAction())
    dispatch(fetchAllProductAction())
  }, [dispatch])
  return (
    <div>
      <AppRoutes/>
      <ToastContainer autoClose={200}/>
      <ModalWrapper/>
    </div>
  )
}

export default App


