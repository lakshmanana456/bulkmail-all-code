import axios from "axios"
import { useState } from "react"
import * as XLSX from 'xlsx'

function App() {

const [msg,setmsg]=useState("")
const [status,setStatus]=useState(false)
const [emailList,setEmailList]=useState([])

function handleMsg(event){
  setmsg(event.target.value)
}

  function send(){
    setStatus(true)
    axios.post("https://render-bulkmail.onrender.com/sendmail",{msg:msg,emailList:emailList})
    .then((data) => {
  if (data.data === true) {
    alert("Email sent successfully");
  } else {
    alert("Failed to send email (invalid credentials)");
  }
  setStatus(false);
})
.catch((error) => {
  alert("Failed to send email (server error)");
  console.log(error);
  setStatus(false);
});
  }

function handleFile(e){
 let file=e.target.files[0]
    const reader=new FileReader()
    reader.onload=function(event){
        // console.log(event.target.result);
        const data=event.target.result
        const workbook=XLSX.read(data,{type:"binary"})
        // console.log(workbook);
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        // console.log(worksheet);
        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        // console.log(emailList);
        const totalemail=emailList.map((item)=>{return item.A })
        // console.log(totalemail);
        setEmailList(totalemail)
    }

    reader.readAsBinaryString(file)
}
  return (
    <div>

      <div className="bg-blue-950 text-white text-center">
        <button className="text-2xl font-medium px-5 py-3">BulkMail</button>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">We can help your business with sending multiple Emails at once</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3"> Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
        <textarea onChange={handleMsg} value={msg} className="w-[80%] h-32 p-2 outline-none border border-black rounded-md" placeholder="Enter the emil text...."></textarea>

        <div>
          <input onChange={handleFile} type="file" className="border-4 border-dashed px-4 py-4 mb-5 mt-5" />

        </div>
        <p>Total Emails in the file: {emailList.length}</p>


        <button onClick={send} className="bg-blue-950 py-2 px-3 mt-2 text-white font-medium rounded-md w-fit">{status?"Sending...":"Send"}</button>
      </div>

      <div className="bg-blue-300 text-white text-center p-8">

      </div>
      <div className="bg-blue-200 text-white text-center p-8">
      </div>

    </div>

  )
}

export default App
