"use client";

import { useEffect, useState } from "react";
import { At } from "@boxicons/react/At";
import { BriefcaseAlt2 } from "@boxicons/react/BriefcaseAlt2";
import { HomeAlt2 } from "@boxicons/react/HomeAlt2";
import { InfoCircle } from "@boxicons/react/InfoCircle";
import { Menu as MenuIcon } from "@boxicons/react/Menu";
import { X as CloseIcon } from "@boxicons/react/X";
import logo from "@/assets/logo.svg";

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
      <nav
        className="glassmorphism fixed left-1/2 top-8 z-[60] inline-flex w-[calc(100vw-3rem)] max-w-[920px] -translate-x-1/2 items-center justify-between rounded-2xl bg-white/[0.08] px-4 py-2 text-white/65"
        aria-label="Navegación principal"
      >
        <a
          href="#home"
          aria-label="Ir a inicio"
          className="rounded-xl p-1 transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
        >
          <img
            src={logo.src}
            width="48"
            height="48"
            alt=""
            aria-hidden="true"
            className="brightness-0 invert"
          />
        </a>

        <button
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white sm:hidden"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-overlay"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <span className="flex items-center gap-2">
              <span className="text-sm font-normal">Cerrar</span>
              <CloseIcon width={22} height={22} fill="currentColor" aria-hidden="true" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-sm font-normal">Menu</span>
              <MenuIcon width={22} height={22} fill="currentColor" aria-hidden="true" />
            </span>
          )}
        </button>

        <ul className="hidden gap-2 sm:flex">
          {menuItems.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={isActive(href) ? "location" : undefined}
                className="flex min-w-16 flex-col items-center justify-center gap-1 rounded-xl border border-transparent px-3 py-2 text-xs font-normal text-white/75 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 aria-[current=location]:bg-white/[0.08] aria-[current=location]:text-white aria-[current=location]:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
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
        className={`fixed inset-0 z-[55] flex flex-col bg-black transition-opacity duration-[250ms] ease-in-out sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="h-28 shrink-0" />
        <nav className="flex flex-1 flex-col justify-center px-8 pb-16" aria-label="Menú móvil">
          <ul className="flex flex-col">
            {menuItems.map(({ href, label }, index) => (
              <li
                key={href}
                className="transition-[opacity,transform] duration-300 ease-out"
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
                  className="group flex items-baseline gap-5 py-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                >
                  <span className="w-6 font-mono text-xs leading-none text-white/30 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[2.5rem] font-semibold leading-none text-white/70 transition-colors duration-200 group-hover:text-white aria-[current=location]:text-white">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
