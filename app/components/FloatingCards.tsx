
"use client";

import { motion } from "framer-motion";

const cards = [
  { title:"AI Agents", value:"128 Active", x:"8%", y:"12%", d:0 },
  { title:"Cloud", value:"99.99% Uptime", x:"72%", y:"18%", d:1 },
  { title:"Security", value:"Protected", x:"4%", y:"72%", d:2 },
  { title:"Automation", value:"4.8M Tasks", x:"74%", y:"74%", d:3 },
];

export default function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {cards.map((c,i)=>(
        <motion.div
          key={i}
          initial={{opacity:0,y:30}}
          animate={{
            opacity:1,
            y:[0,-12,0],
            rotate:[0,1.5,0,-1.5,0]
          }}
          transition={{
            opacity:{duration:.8,delay:i*.15},
            y:{duration:5+i,repeat:Infinity,ease:"easeInOut"},
            rotate:{duration:8+i,repeat:Infinity,ease:"easeInOut"}
          }}
          className="absolute w-56 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(124,58,237,.25)]"
          style={{left:c.x,top:c.y}}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[10px] uppercase tracking-[0.3em] text-violet-300">
              LIVE
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {c.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-300">
            {c.value}
          </p>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300"
              animate={{width:["15%","92%","45%","100%"]}}
              transition={{duration:6+i,repeat:Infinity}}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
