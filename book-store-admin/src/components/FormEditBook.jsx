import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBook = () => {
  const Bkid = useParams().id;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    price: 0,
    description: "",
    CategoryId: 0,
  });
  const [category, setCategory] = useState([]);
  //   gambar
  const [selectedFile, setSelectedFile] = useState(
    "Pilih gambar baru"
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   API data buku + id
  useEffect(() => {
    axios
      .get("http://localhost:3000/book/" + Bkid)
      .then((res) => {
        setValues({
          ...values,
          title: res.data.title,
          category: res.data.category,
          author: res.data.author,
          image: res.data.image,
          price: res.data.price,
          description: res.data.description,
          CategoryId: res.data.CategoryId,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeSelect = (e) => {
    setValues({
      ...values,
      category: e.target.value,
      CategoryId: e.target.selectedIndex + 1,
    });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    setSelectedFile(URL.createObjectURL(e.target.files[0]))
    console.log(selectedFile);
    setValues({ ...values, image: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch("http://localhost:3000/edit/book/" + Bkid, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/")
      })
      .catch((err) => console.log(err));
  };

  console.log(values);

  return (
    <div className="container px-4 mx-auto">
      <div className="py-6 px-8 bg-[#fff]">
        <h2 className="font-bold heading2 text-left mb-3">Edit Buku</h2>
        <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
          <div className="flex flex-col text-left">
            <label> Judul Buku:</label>
            <input
              type="text"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              className="input-text"
            />
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Kategori:</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChangeSelect}
              className="input-text"
            >
              {category.map((value) => {
                return (
                  <option key={value.id} value={value.name} id={value.id}>
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Penulis:</label>
            <input
              type="text"
              value={values.author}
              onChange={(e) => setValues({ ...values, author: e.target.value })}
              className="input-text"
            />
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Gambar:</label>
            <div className="flex flex-row items-center gap-2">
              <input
                type="file"
                id="custom-input"
                // value={values.image ? values.image : ""}
                onChange={handleChangeImage}
                hidden
              />
              <label htmlFor="custom-input" className="btnPrimary">
                Upload Sampul
              </label>
              <label className="paragraph-small">{selectedFile}</label>
            </div>
            {
              selectedFile == "Pilih gambar baru" ? 
              <img src={`http://localhost:3000/images/${values.image}`} className=" w-48" />
               : 
               <img src={selectedFile} className=" w-48" />
            }
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Harga:</label>
            <input
              type="text"
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              className="input-text"
            />
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Deskripsi:</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className="border-2"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className=" inline-flex gap-3">
            <button type="submit" className="btnPrimary">
              Simpan
            </button>
            <button
              type="reset"
              onClick={() => navigate("/")}
              className="btnReset"
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditBook;
