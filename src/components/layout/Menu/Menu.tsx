"use client";

import { useEffect, useState } from "react";
import { At } from "@boxicons/react/At";
import { BriefcaseAlt2 } from "@boxicons/react/BriefcaseAlt2";
import { HomeAlt2 } from "@boxicons/react/HomeAlt2";
import { InfoCircle } from "@boxicons/react/InfoCircle";
import { Menu as MenuIcon } from "@boxicons/react/Menu";
import { X as CloseIcon } from "@boxicons/react/X";
import logo from "@/assets/logo.svg";
import { concatClasses } from "@/lib/concatClasses";
import styles from "./Menu.module.scss";

const menuItems = [
  { href: "#home", label: "Inicio", Icon: HomeAlt2 },
  { href: "#about", label: "Acerca de", Icon: InfoCircle },
  { href: "#work", label: "Trabajo", Icon: BriefcaseAlt2 },
  { href: "#contact", label: "Contacto", Icon: At },
] as const;

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  const isActive = (href: string) => activeHash === href;

  useEffect(() => {
    const sections = menuItems
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className={styles.nav} aria-label="Navegación principal">
        <a href="#home" aria-label="Ir a inicio" className={styles.logoLink}>
          <img
            src={logo.src}
            width="48"
            height="48"
            alt=""
            aria-hidden="true"
            className={styles.logoImg}
          />
        </a>

        <button
          className={styles.toggleButton}
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-overlay"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <span className={styles.toggleContent}>
              <span className={styles.toggleLabel}>Cerrar</span>
              <CloseIcon width={22} height={22} fill="currentColor" aria-hidden="true" />
            </span>
          ) : (
            <span className={styles.toggleContent}>
              <span className={styles.toggleLabel}>Menu</span>
              <MenuIcon width={22} height={22} fill="currentColor" aria-hidden="true" />
            </span>
          )}
        </button>

        <ul className={styles.desktopNav}>
          {menuItems.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={isActive(href) ? "location" : undefined}
                className={styles.navLink}
              >
                <Icon width={22} height={22} fill="currentColor" aria-hidden="true" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        id="mobile-menu-overlay"
        role="region"
        aria-label="Menú de navegación móvil"
        aria-hidden={!isOpen}
        className={concatClasses([styles.overlay, isOpen && styles.overlayOpen])}
      >
        <div className={styles.overlaySpacer} />
        <nav className={styles.overlayNav} aria-label="Menú móvil">
          <ul className={styles.overlayList}>
            {menuItems.map(({ href, label }, index) => (
              <li
                key={href}
                className={styles.overlayItem}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: isOpen ? `${0.08 + index * 0.06}s` : "0s",
                }}
              >
                <a
                  href={href}
                  aria-current={isActive(href) ? "location" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={styles.overlayLink}
                >
                  <span className={styles.overlayIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.overlayLabel}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
