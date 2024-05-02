import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAddBook() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  //   preview gambar
  const [selectedFile, setSelectedFile] = useState(
    "Belum ada gambar yang dipilih"
  );
  // data input
  const [values, setValues] = useState({
    title: "",
    category: "",
    author: "",
    image: "",
    price: 0,
    description: "",
    CategoryId: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/category")
      .then((res) => {
        setCategory(res.data);
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
    console.log(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: file });
  };

  console.log(values);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/add/book", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="py-6 px-8 bg-[#fff] min-w-full">
        <h2 className="font-bold heading2 text-left mb-3">Tambah Buku</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
          <div className="flex flex-col text-left">
            <label> Judul Buku:</label>
            <input
              type="text"
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
                onChange={handleChangeImage}
                hidden
              />
              <label htmlFor="custom-input" className="btnPrimary">
                Upload Sampul
              </label>
              <label className="paragraph-small">{selectedFile}</label>
            </div>
            {selectedFile === "Belum ada gambar yang dipilih" ? (
              <img src={selectedFile} hidden className=" w-48" />
            ) : (
              <img src={selectedFile} className=" w-48" />
            )}
            {/* <img src={selectedFile} hidden className=" w-48" /> */}
          </div>
          <div className="flex flex-col text-left gap-1">
            <label> Harga:</label>
            <input
              type="text"
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
}

export default FormAddBook;
