"use client";

export default function AIMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[140px] rounded-full top-[-200px] left-[-200px] animate-pulse"/>

      <div className="absolute w-[600px] h-[600px] bg-pink-500/30 blur-[120px] rounded-full bottom-[-200px] right-[-200px] animate-pulse"/>

      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full top-[40%] left-[40%]"/>
      
    </div>
  );
}