"use client";

import { idleComponent } from "@/lib/useIdleComponent";
import Loader from "@/components/Loader";
import diegue from "@/assets/diegue.svg";
import logo from "@/assets/logo.svg";

const HeroBackground = idleComponent(
  () => import("@/components/HeroBackground"),
);

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black"
      aria-labelledby="home-title"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {HeroBackground && <HeroBackground />}
      </div>

      <div className="absolute inset-0 z-[1] bg-black/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center px-6 text-center text-white">
        <h1 id="home-title" className="sr-only">
          Diegue, desarrollador web en Pamplona
        </h1>
        <p className="eyebrow mb-3 text-white/60 sm:text-sm" aria-hidden="true">
          DESARROLLADOR FRONTEND
        </p>
        <p className="mb-2 text-[clamp(3.5rem,15vw,8.5rem)] font-semibold leading-[0.85] tracking-normal text-white text-accent drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:mb-6">
          <span>hola, soy</span>
          <br />
          <span>diegue</span>
        </p>
        <p className="mt-5 max-w-[32rem] text-sm font-normal leading-6 text-white/80 sm:text-base sm:leading-7">
          Construyo experiencias web rápidas y accesibles utilizando React,
          TypeScript y una gran atención al detalle.
        </p>
      </div>

      <div className="absolute bottom-20 z-10" aria-hidden="true">
        <Loader
          spinningIcon={diegue.src}
          centerIcon={logo.src}
          rotationDuration={10}
          size={80}
        />
      </div>
    </section>
  );
}
