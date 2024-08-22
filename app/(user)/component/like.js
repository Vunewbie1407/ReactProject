import { useState } from "react";

export default function Like(){

    const [count, setCount] = useState(0);
    const [userList, setUserList] = useState([]);
    const user = {
        "id": 1,
        "name" : "vu",
    }
    const like = () =>{
        const index = userList.findIndex((item)=>item.id==user.id);
        if(index==-1){
            setCount(count+1);
            setUserList([...userList,user])
        }else{
            setCount(count-1);
            let list = userList;
            list.splice(index,1);
            setUserList(list);
        }
    }
    return(
        <>
            Luot thich: <strong>{count}</strong> <br></br>
            Nhung nguoi da thich: {" "}
                {userList.map((item)=>{
                    return item.name;
                })
                }
            <button onClick={like}>{(userList.findIndex((item)=>item.id==user.id))==-1?'Thich':'Da Thich'}</button>
        </>
    );
}