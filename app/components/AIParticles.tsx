"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AIParticles() {

  const particlesInit = async (main:any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background:{color:"transparent"},
        fpsLimit:60,
        particles:{
          color:{value:"#a855f7"},
          links:{
            color:"#a855f7",
            distance:150,
            enable:true,
            opacity:0.4,
            width:1
          },
          move:{
            enable:true,
            speed:1
          },
          number:{
            value:60
          },
          opacity:{
            value:0.4
          },
          size:{
            value:3
          }
        }
      }}
      className="absolute inset-0 -z-10"
    />
  );
}