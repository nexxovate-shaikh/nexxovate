
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AIOrb() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my,{stiffness:120,damping:18});
  const ry = useSpring(mx,{stiffness:120,damping:18});

  return (
    <div
      className="relative mx-auto flex h-[560px] w-[560px] items-center justify-center"
      onMouseMove={(e)=>{
        const r=e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX-r.left-r.width/2)/18);
        my.set(-(e.clientY-r.top-r.height/2)/18);
      }}
      onMouseLeave={()=>{mx.set(0);my.set(0);}}
      style={{perspective:1200}}
    >
      <motion.div
        style={{rotateX:rx,rotateY:ry}}
        className="relative h-[340px] w-[340px] rounded-full"
      >
        <motion.div
          animate={{rotate:360}}
          transition={{duration:30,repeat:Infinity,ease:"linear"}}
          className="absolute inset-0 rounded-full border border-violet-400/30"
        />
        <motion.div
          animate={{rotate:-360,scale:[1,1.04,1]}}
          transition={{rotate:{duration:20,repeat:Infinity,ease:"linear"},scale:{duration:4,repeat:Infinity}}}
          className="absolute inset-6 rounded-full border border-fuchsia-400/30"
        />
        <motion.div
          animate={{rotate:360}}
          transition={{duration:14,repeat:Infinity,ease:"linear"}}
          className="absolute inset-12 rounded-full border border-amber-300/40"
        />
        <motion.div
          animate={{scale:[1,.92,1],opacity:[.8,1,.8]}}
          transition={{duration:3,repeat:Infinity}}
          className="absolute inset-[88px] rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-300 shadow-[0_0_120px_rgba(168,85,247,.9)]"
        />
        {Array.from({length:24}).map((_,i)=>(
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white"
            style={{transformOrigin:`0 ${110+i*2}px`}}
            animate={{rotate:360}}
            transition={{duration:8+i*.5,repeat:Infinity,ease:"linear"}}
          />
        ))}
      </motion.div>
    </div>
  )
}
