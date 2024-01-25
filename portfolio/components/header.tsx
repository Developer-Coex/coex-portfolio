import React, { use, useEffect, useRef, useState } from "react";
import Magentic from "./ui/magentic";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Logo from "@/public/svg/Logo.svg";

gsap.registerPlugin(CustomEase);
const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");

type HeaderProps = {
  color: "Dark" | "Light";
};

export function Header({ color }: HeaderProps) {
  const possibleTailwindClasses = [
    "bg-colorDark",
    "bg-colorLight",
    "text-colorDark",
    "text-colorLight",
    "before:bg-colorDark",
    "before:bg-colorLight",
  ];

  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    logoAnimationTl.current = gsap.timeline({ paused: true }).fromTo(
      `.logo__rotate`,
      { rotate: 0 },
      {
        rotate: -360,
        // opacity: 0,
        duration: 0.6,
        ease: ease,
      },
    );

    return () => {
      logoAnimationTl.current?.kill();
    };
  }, []);
  return (
    <header className="nav__container anime px-paddingX">
      <nav className="nav__bar ">
        <div className="max-w-maxWidth">
          <Magentic
            href="#"
            strength={50}
            className={`mask nav__item text-xl font-semibold text-color${color} before:bg-color${color}`}
            onMouseEnter={() => {
              console.log("hello");
              logoAnimationTl.current?.play();
            }}
            onMouseLeave={() => {
              logoAnimationTl.current?.reverse();
            }}
          >
            <p className="logo__anim grid grid-flow-col items-center  ">
              Vipul
              <span className="logo__rotate inline-block h-full p-[0.12em]">
                <Logo className="h-full" />
              </span>
            </p>
          </Magentic>
          <Magentic
            strength={50}
            className={`mask nav__item h-full cursor-pointer items-center text-color${color} before:bg-color${color}`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div className="flex h-3 w-9 flex-col justify-between ">
              <div
                className={`h-[0.15rem] w-full rounded-full bg-color${color}`}
              ></div>
              <div
                className={`h-[0.15rem] w-full rounded-full bg-color${color}`}
              ></div>
            </div>
          </Magentic>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-colorDark"></div>
      )}
    </header>
  );
}
