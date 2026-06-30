"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${8 + (i % 6) * 17}%`,
  top: `${10 + Math.floor(i / 6) * 15}%`,
  delay: (i % 10) * 0.25,
}));

const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10],[10,11],[12,13],[13,14],[14,15],[15,16],[16,17]];

export default function NeuralBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#04040a]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(124,58,237,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.4)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={reduce ? {} : { x:[0,80,-20,0], y:[0,40,-30,0], scale:[1,1.15,.95,1]}}
        transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}
      />
      <motion.div
        className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full bg-fuchsia-500/20 blur-[120px]"
        animate={reduce ? {} : { x:[0,-60,40,0], y:[0,-40,20,0], scale:[1,.9,1.1,1]}}
        transition={{duration:24,repeat:Infinity,ease:"easeInOut"}}
      />

      <svg className="absolute inset-0 h-full w-full opacity-30">
        <defs><linearGradient id="g"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
        {lines.map(([a,b],i)=>(
          <line key={i} x1={nodes[a].left} y1={nodes[a].top} x2={nodes[b].left} y2={nodes[b].top} stroke="url(#g)" strokeWidth="1.2"/>
        ))}
      </svg>

      {nodes.map(n=>(
        <motion.div key={n.id}
          className="absolute h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(168,85,247,.9)]"
          style={{left:n.left,top:n.top}}
          animate={reduce?{}:{scale:[1,1.8,1],opacity:[.5,1,.5]}}
          transition={{duration:2.5,repeat:Infinity,delay:n.delay}}
        />
      ))}

      {Array.from({length:18}).map((_,i)=>(
        <motion.div key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,1)]"
          initial={{x:"-10vw", y:(i*55)%700}}
          animate={reduce?{}:{x:"110vw"}}
          transition={{duration:8+(i%5),delay:i*.5,repeat:Infinity,ease:"linear"}}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:6px_6px]" />
    </div>
  );
}
