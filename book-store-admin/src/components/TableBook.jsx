import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TableBook = () => {
  const navigate = useNavigate()
  const [books, setBook] = useState([]);

  const toAddBook = () => {
    navigate("/add/book");
  }

  // API data buku
  useEffect(() => {
    axios.get("http://localhost:3000/book")
      .then((res) => {
        console.log(res);
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/book/" + id)
    .then(res => {
      location.reload();
    })
    .catch(err => console.log(err));
  }

  const handleEditForm = (id) => {
    navigate("/edit/book/" + id)
  }

  return (
    <div className='container mx-auto'>
      <div className='flex'>
        <button className='btnPrimary' onClick={toAddBook}>Tambah Buku</button>
      </div>

      <div className='flex flex-col'>
      <div className=''>
            <div className='inline-block min-w-full'>
              <div className='overflow-hidden border border-gray-200'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='tableHeader '>
                    <tr>
                      <th scope='col' className='tableCol' >No</th>
                      <th scope='col' className='tableCol w-36' >Gambar</th>
                      <th scope='col' className='tableCol' >Judul</th>
                      <th scope='col' className='tableCol' >Kategori</th>
                      <th scope='col' className='tableCol' >Penulis</th>
                      <th scope='col' className='tableCol' >Harga</th>
                      <th scope='col' className='tableCol' >Deskripsi</th>
                      <th scope='col' className='tableCol' >Aksi</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {
                      books.map((book, idx) => (
                        <tr key={idx}>
                          <td className='tableData'>{idx + 1}</td>
                          <td className='tableData flex items-center justify-center'>
                            <img src={`http://localhost:3000/images/${book.image}`} alt="book pic" className='object-cover w-20 h-32'/>
                          </td>
                          <td  className='tableData'>{book.title}</td>
                          <td  className='tableData'>{book.category}</td>
                          <td  className='tableData'>{book.author}</td>
                          <td  className='tableData'>{book.price}</td>
                          <td  className='tableData'>{book.description}</td>
                          <td  className='tableData'>
                            <div className='px-3 gap-2 inline-flex'>
                              <button className='btnPrimary' onClick={() => handleEditForm(book.id)}>edit</button>
                              <button className='btnReset' onClick={() => handleDelete(book.id)}>hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default TableBook