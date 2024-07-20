import { useState } from "react";

export default function ItemDefault({quantity, setQuantity}) {
    return (
        <div className="relative w-[100px] text-center bg-[hsl(25,100%,94%)] ">
            <button className="absolute left-0 top-0 w-[30px] h-full flex justify-center items-center" onClick={() => {
                if (quantity > 0) {
                    setQuantity(quantity - 1);
                }
            }}><img src="../../images/icon-minus.svg" alt="" /></button>
            <input className="block w-full text-center h-full" type="text" value={quantity} onChange={(e) => {
                setQuantity(e.target.value)
            }}/>
            <button className="absolute right-0 top-0 w-[30px] h-full flex justify-center items-center" onClick={() => {
                setQuantity(quantity + 1);
            }}><img src="../../images/icon-plus.svg" alt="" /></button>
        </div>
    );
}