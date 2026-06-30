"use client";

import { motion } from "framer-motion";
import SparkleField from "./SparkleField";
import CircuitLines from "./CircuitLines";

const stats=[
["250+","Enterprise Projects"],
["98%","Client Satisfaction"],
["35","Countries Served"],
["24/7","AI Operations"],
];

export default function AIStats(){
return(
<section className="relative overflow-hidden bg-[#050508] py-24 text-white">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,.12),transparent_60%)]"/>
<CircuitLines opacity={0.05} pulses={1} />
<SparkleField count={10} />
<div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
{stats.map(([v,l],i)=>(
<motion.div
key={l}
initial={{opacity:0,y:24}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.08}}
whileHover={{y:-8}}
className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
<motion.div
className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent"
animate={{opacity:[.8,1,.8]}}
transition={{duration:2,repeat:Infinity}}>
{v}
</motion.div>
<div className="mt-4 h-px w-16 bg-gradient-to-r from-violet-500 to-amber-300"/>
<p className="mt-5 text-zinc-300">{l}</p>
</motion.div>
))}
</div>
</section>
)}
