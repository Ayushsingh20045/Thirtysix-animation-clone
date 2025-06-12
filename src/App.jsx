import React, { useEffect, useState ,useRef } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const App = () => {
  const [showCanvas, setshowCanvas] = useState(false);
const headingRef = useRef(null);
const growingSpan = useRef(null);

useEffect(()=>{
  const locomotiveScroll = new LocomotiveScroll();
   
  
}, [])



useEffect(()=>{

  const handleClick = (e) => {

    setshowCanvas((prevShowCanvas)=>{

      if (!prevShowCanvas) {
        gsap.set(growingSpan.current,{
          top:e.clientY,
          left:e.clientX,
          
        });
        
        gsap.to("body",{
          color:"#000",
          duration:1.2,
          backgroundColor:"#fd2c2a",
          ease:"power2.inOut"
        });
  
        gsap.to(growingSpan.current,{
          scale:1000,
          duration:1.5,
        
          ease:"power2.inOut",
          onComplete:()=>{
            gsap.set(growingSpan.current,{
              scale:0,
              
              clearProps:"all",
             
              
            })
          }
        });
      }
      else{
        gsap.to("body",{
          backgroundColor:"#000",
          color:"#fff",
          duration:1.2,
          ease:"power2.inOut",
        
        });
      }
      return !prevShowCanvas;
    });
  
 };
 
 const headingElement = headingRef.current;

 headingElement.addEventListener("click",handleClick);
 return ()=> headingElement.removeEventListener("click",handleClick);

},[])


  return (
    <>
    <span className="growing block fixed top-[-20px] left-[-20px] w-5 h-5 rounded-full bg-[#FD2C2A]  " ref={growingSpan}></span>
    {/* divs of different screen for different canvas: */}
      <div className="relative w-full min-h-screen font-serif ">
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
        <div className=" w-full relative z-[1] h-screen ">
        <nav className=" top-0 w-full z-50">
          <div className="container mx-auto px-20 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semi-bold"
            
              >Thirtysixstudios</div>
              <ul className="flex gap-8">
                {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-red-500 transition-colors font-serif"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="textcontainer px-[20%]   w-full mt-10">

        <div className="text w-[40%]">

        <h3 className="text-4xl font-serif font-medium ">At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.</h3>
          
          <p className="text-sm mt-8">
          We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
          </p>
          <p className="text-lg mt-8 tracking-tight">Scroll</p>
        </div>
      
        </div>
        <div className="w-full absolute bottom-0 left-0">
          <h1 className="text-[14rem] leading-none"  ref={headingRef}>Thirtysixstudio</h1>
        </div>
        </div>
      </div>

      {/* about the brand */}
       <div className="w-full relative h-screen mt-30 px-30">
       {showCanvas && data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
        <div className=" z-[1]">
<h1 className=" text-8xl font-serif font-medium pt-12">About the brand</h1>
   <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
    We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
   </p>
   <img src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="img" className="w-[90%] mt-10 " />
       </div>
       </div>
    </>
    
  );
};

export default App;
