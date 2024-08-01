import React from 'react'
import { RxCross2 } from "react-icons/rx";

function LeftNav({ setOpenNav }) {
    const NavList = [
        {
            no: 1,
            Name: "Home"
        },
        {
            no: 2,
            Name: "Inbox"
        },
        {
            no: 3,
            Name: "Settings"
        },
        {
            no: 4,
            Name: "Members"
        },
        {
            no: 5,
            Name: "Trash"
        },
        {
            no: 6,
            Name: "Help & Support"
        },
        {
            no: 7,
            Name: "Calender"
        },
        {
            no: 8,
            Name: "Todo List"
        },
    ]
    function navbarclose() {
        setOpenNav(false)
    }
    return (
        <div>
            <div onClick={navbarclose} className='float-right cursor-pointer'><RxCross2 size={"24px"} color='red' /></div>
            <div className='grid grid-rows-5 mx-3 my-5 text-center p-5'>
                {
                    NavList.map((item) => {
                        return <div key={item.no}>
                            <p className='p-5 text-[#777777]'>{item.Name}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default LeftNav
