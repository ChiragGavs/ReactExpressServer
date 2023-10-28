import './App.css';
import React , {useState} from 'react';
import axios from 'axios';

function App() {
      const [data, setUserData] = useState([])
      const [emailid , setemail]= useState('');
      const [password , setpasswd] = useState('');
      const [userid , setUID] = useState('');

      const updateUserID =(event)=>{
        setUID(event.target.value);
        //console.log("user id : "+userid);
      }

      const updateEmailId=(event)=>{
        setemail(event.target.value);
      }
      const updatePasswd=(event)=>{
        setpasswd(event.target.value);
      }

      function showUser(event){
        event.preventDefault();
        fetch('http://localhost:8900/getAll').then((response) => response.json()).then((data) => setUserData(data)).then(console.log(data));
       }
      function updateUser(event) {
        event.preventDefault();
        axios.post('http://localhost:8900/update', { uid: userid, email: emailid, passwd: password })
            .then(res => console.log(res))
            .catch(err => console.error('Error updating user:', err));
    }
      function insertUser(event){
        event.preventDefault();
        axios.post('http://localhost:8900/insert', {uid:userid , email:emailid, passwd:password}).then(res => console.log(res));
      }
      function deleteUser(event){
        
        event.preventDefault();
        fetch(`http://localhost:8900/delete?uid=${userid}`).then((response) => response.json());
      }

  return (
    <div className="App">
      <form onSubmit={insertUser}>
        <b><i>User id :</i></b> <input type='text'onChange={updateUserID}></input><br/>
        <b><i>emailid :</i></b><input type="text" onChange={updateEmailId}></input><br/>
        <b><i>Password:</i></b><input type="password" onChange={updatePasswd}></input><br/>
        <input type='reset'></input>
        <input type='button' value='delete' onClick={deleteUser}></input>
        <input type='button' value='update' onClick={updateUser}></input>
        <input type='button' value='Show' onClick={showUser}></input><br/>        
        <input type='submit' ></input>
      </form>
      <ul>
        {data.map((item)=>
          <li key={(item.userid)}>
              {item.userid} : {item.email}
          </li>)}
      </ul>
    </div>
  );
}
export default App;