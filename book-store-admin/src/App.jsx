import './App.css'
import TableBook from './components/TableBook';
import FormAddBook from './components/FormAddBook';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import FormEditBook from './components/FormEditBook';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<TableBook></TableBook>}></Route>
          <Route path='/add/book' element={<FormAddBook></FormAddBook>}></Route>

          <Route path='/book' element={<TableBook></TableBook>}></Route>
          <Route path='/edit/book/:id' element={<FormEditBook></FormEditBook>}></Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
