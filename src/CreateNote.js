import React, { useEffect, useState } from 'react';
import add from './Images/add.png';
import remove from './Images/remove.svg';
import delAll from './Images/deleteAll.svg';

const getDataFromLocalStorage = () => {
  const getAllData = localStorage.getItem("allData");
  if (getAllData) {
    return JSON.parse(getAllData)
  }
  return [];
}

const CreateNote = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [data, setData] = useState(getDataFromLocalStorage());
  const [errMsg, setErrMsg] = useState("");
  const [otherMessages, setOtherMessages] = useState("");

  const handleClick = () => {

    if (title && content) {
      const note = {
        title,
        content,
        id: new Date().getTime().toString()
      }
      setData([...data, note]);
      setTitle("")
      setContent("")

      setOtherMessages("Note added 👇🏻")
      setTimeout(() => {

        setOtherMessages("")
      }, 1500)
    }
    else {
      setErrMsg("Please Fill the data");
      setTimeout(() => {
        setErrMsg("")
      }, 1500)
    }
  }

  const deleteNote = (id) => {
    // console.log(id)
    const returnNotes = data.filter((elem) => {
      return elem.id !== id;
    })
    setData(returnNotes)
    setOtherMessages("Deleted✔");
    setTimeout(() => {
      setOtherMessages("");
    }, 1500)
  }

  useEffect(() => {
    localStorage.setItem("allData", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <input type="text" name="" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title.." className=" w-64 border h-10  border-yellow-500 rounded-xl px-3 tracking-wider placeholder-gray-500 text-gray-900 focus:border-yellow-600 focus:rounded-xl focus:outline-none sm:w-80 md:w-96 mb-5" maxLength={18} />

        <textarea name="" id="" cols="30" rows="5" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a note..." className=" w-64 p-4 border-2 border-yellow-500  rounded-lg placeholder-gray-400 tracking-wider mb-6 text-gray-900 focus:border-yellow-600 focus:rounded-xl focus:outline-none resize-none sm:w-80 md:w-96" maxLength={50} ></textarea>

        <button onClick={handleClick} className="border-1 border-black bg-white rounded-lg  w-8 mb-3 sm:w-10 md:w-11"><img src={add} alt="add" /></button>

        <p className={`h-3 font-bold mb-5  ${errMsg ? "text-red-500" : "text-green-500"} tracking-wider`}>{errMsg ? errMsg : otherMessages}</p>
      </div>


      <hr className='border-yellow-300 sm:mx-20  md:mx-52 ' />


      {
        data.map((elem) => {
          return (

            <div key={elem.id} className="flex justify-center flex-col items-center  m-auto border border-yellow-500 w-56 mt-10 bg-white px-3 rounded-md h-28 sm:w-72 ">

              <h2 className='bg-white w-full text-center px-5 py-1 tracking-wider border-b border-gray-400 font-extrabold '>{elem.title}</h2>

              <p className='bg-white w-full text-center px-5 pt-2  py-2 tracking-wider font-serief overflow-auto'>{elem.content}</p>

              <button onClick={() => deleteNote(elem.id)} className=" 
         px-3  w-11 sm:w-12"><img src={remove} alt="remove" className='bg-white border rounded-md border-red-500' /></button>

            </div>

          )
        })
      }

      {
        data.length >= 1 ? <button onClick={() => {
          setData([])
          setOtherMessages("All Cleared✔")
          setTimeout(() => {
            setOtherMessages("")
          }, 1500)
        }} className='tracking-wider mt-5 p-1 py-1 flex justify-center items-center w-28 m-auto ' ><img src={delAll} alt="" /></button> : null
      }

    </>
  )
}

export default CreateNote;