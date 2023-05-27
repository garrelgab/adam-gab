import React, { useState, useEffect } from "react";
import {HiOutlineChevronUp} from "react-icons/hi"
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>{
        if(window.scrollY > 200){
            setIsVisible(true)
        } else{
            setIsVisible(false)
        }
    })
  }, [])

  const scrollUp = () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
  }

  return <div>
    {isVisible && (
        <button className="text-black fixed left-[90%] md:left-[93%] bottom-[100px]" onClick={scrollUp}>
            <HiOutlineChevronUp size={30} className=' h-[40px] w-[40px] rounded-full bg-white shadow-lg'> </HiOutlineChevronUp>
        </button>
    )}
  </div>
};

export default BackToTopButton;
