import React, { useEffect ,useRef, useState} from 'react'
import canvasimages from './canvasimages.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const Canvas = ({ details }) => {
const {startIndex,numImages,duration,size,top,left,zIndex}=details;
const canvasRef=useRef(null);
const [index, setindex] = useState({value:startIndex})

useGSAP(()=>{
gsap.to(index,{
  value: startIndex + numImages - 1,
  duration:duration,
  ease:"linear",
  repeat:-1,
  
  onUpdate:()=>{
    setindex({value:Math.round(index.value)})
  }
})
gsap.from(canvasRef.current,{
 opacity:0,
 duration:1,
 ease:"power2.inOut",

})
})

  useEffect(() => {
    const scale=window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = canvasimages[index.value];

    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(scale,scale);
      ctx.drawImage(img,0,0,canvas.offsetWidth,canvas.offsetHeight);
    };
  }, [index]);

  return (
    <canvas id="canvas" ref={canvasRef}
    data-scroll
    data-scroll-speed={
      Math.random().toFixed(1)
    }
     className='absolute'
      style={{width:`${size*1.2}px`,
    height:`${size*1.2}px`,
    top:`${top}%`,
    left:`${left}%`,
    zIndex:`${zIndex}`}}>
  <img src={canvasimages[index.value]} alt="" />
    </canvas>
  )
}

export default Canvas;
