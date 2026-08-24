"use client";

import { idleComponent } from "@/lib/useIdleComponent";
import Loader from "@/components/ui/Loader/Loader";
import Text from "@/components/ui/Text/Text";
import diegue from "@/assets/diegue.svg";
import logo from "@/assets/logo.svg";
import styles from "./Hero.module.scss";

const HeroBackground = idleComponent(
  () => import("./components/HeroBackground"),
);

export default function Hero() {
  return (
    <section id="home" className={styles.section} aria-labelledby="home-title">
      <div className={styles.backgroundContainer} aria-hidden="true">
        {HeroBackground && <HeroBackground />}
      </div>

      <div className={styles.darkOverlay} />

      <div className={styles.content}>
        <h1 id="home-title" className={styles.srOnly}>
          Diegue, desarrollador web en Pamplona
        </h1>
        <Text as="p" variant="eyebrow" className={styles.eyebrow} aria-hidden="true">
          DESARROLLADOR FRONTEND
        </Text>
        <p className={styles.title}>
          <span>hola, soy</span>
          <br />
          <span>diegue</span>
        </p>
        <Text as="p" variant="body" className={styles.subtitle}>
          Construyo experiencias web rápidas y accesibles utilizando React,
          TypeScript y una gran atención al detalle.
        </Text>
      </div>

      <div className={styles.loaderWrap} aria-hidden="true">
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
