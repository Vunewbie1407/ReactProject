// import { useState } from "react";
"use client"
import { useDispatch, useSelector } from "react-redux";
import {decrement, increment} from "@/redux/slices/counterSlice"

export default function Counter() {
    const dispath = useDispatch();
    const count = useSelector((state)=>state.counter);
    return(
        <>
            <h1>Counter Click:<strong>{count}</strong></h1>
            <button onClick={()=>dispath(increment())}>Tang</button>
            <button onClick={()=>dispath(decrement())}>Giam</button>
        </>
    )
}