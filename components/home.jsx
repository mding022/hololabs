"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import { TextLoop } from "easy-react-text-loop";
import Link from "next/link";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Component() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
            window.scrollTo(0, 0);
            setScrollY(prevScrollY => {
                const newScrollY = prevScrollY - event.deltaY;
                return Math.max(Math.min(newScrollY, 0), -2000);
            });
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const easeScrollTo = (targetScrollY) => {
        const duration = 1000; // Animation duration in milliseconds
        const startScrollY = scrollY;
        const startTime = performance.now();

        const animate = (time) => {
            const elapsedTime = time - startTime;
            const t = Math.min(elapsedTime / duration, 1);
            const easeInOutQuad = t * (2 - t); // Ease-in-out function
            const currentScrollY = startScrollY + easeInOutQuad * (targetScrollY - startScrollY);

            setScrollY(currentScrollY);

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const handleClick = () => {
            easeScrollTo(-2000);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [scrollY]);

    const scale = Math.max(Math.min(1 - scrollY / 7000, 1.2), 1);
    const opacity = Math.min(Math.max((scrollY + 1500) / 500, 0), 1);

    return (
        <div className="flex w-full flex-col bg-background relative font-sans">
            <header className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="https://github.com/mding022/hololabs" className="flex items-center" prefetch={false}>
                    <Logo className="h-12 w-12" />
                    <span className="ml-2 text-lg font-medium">HoloLabs</span>
                </Link>
                <nav className="hidden space-x-4 sm:flex">
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Log In
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="/docs" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        API Docs
                    </Link>
                </nav>
                <div className="flex items-center space-x-3 relative">
                    <a href="https://hololabs.tech/docs" target="_blank">
                        <EarthLogo className="h-8 w-8 hover:cursor-pointer" />
                    </a>
                    <Button><b>Sign Up</b></Button>
                </div>
            </header>
            <main className="flex-1" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
                <section className="flex flex-col items-center justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-8">
                    <div className="max-w-2xl text-left">
                        <p className="pb-5 text-4xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-black">
                            All-in-one AI content solution with an extensive library of tools, like&nbsp;
                            <TextLoop interval="4000">
                                <span>Holo FaceSwap</span>
                                <span>AI Image Eraser</span>
                                <span>AE Templates</span>
                                <span>FS Videos</span>
                                <span>Remove BG</span>
                            </TextLoop>
                        </p>
                        <Link href="/main">
                            <Button>
                                <p className="font-extrabold text-lg">Try it out</p>
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <img
                src="/images/cows.jpg"
                alt="Fading Overlay"
                className="absolute inset-0 w-full h-full"
                style={{
                    opacity,
                    pointerEvents: 'none',
                    objectFit: 'cover',
                    height: '100vh'
                }}
            />
        </div>
    );
}

function Logo(props) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 transform transition-transform duration-300 ease-in-out hover:scale-120 hover:rotate-90 cursor-pointer"
        >
            <path
                d="M11 6H13V10.079L16.3413 7.73938L17.4885 9.37768L13.7434 12L17.4885 14.6223L16.3413 16.2606L13 13.921V18H11V13.921L7.65864 16.2606L6.51148 14.6223L10.2565 12L6.51147 9.37769L7.65863 7.73938L11 10.079V6Z"
                fill="currentColor"
            />
        </svg>
    );
}

function EarthLogo(props) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM14.8055 18.4151C17.1228 17.4003 18.7847 15.1667 18.9806 12.525C18.1577 12.9738 17.12 13.3418 15.9371 13.598C15.7882 15.4676 15.3827 17.1371 14.8055 18.4151ZM9.1945 5.58487C7.24725 6.43766 5.76275 8.15106 5.22208 10.244C5.4537 10.4638 5.84813 10.7341 6.44832 11.0008C6.89715 11.2003 7.42053 11.3798 8.00537 11.5297C8.05853 9.20582 8.50349 7.11489 9.1945 5.58487ZM10.1006 13.9108C10.2573 15.3675 10.5852 16.6202 10.9992 17.5517C11.2932 18.2133 11.5916 18.6248 11.8218 18.8439C11.9037 18.9219 11.9629 18.9634 12 18.9848C12.0371 18.9634 12.0963 18.9219 12.1782 18.8439C12.4084 18.6248 12.7068 18.2133 13.0008 17.5517C13.4148 16.6202 13.7427 15.3675 13.8994 13.9108C13.2871 13.9692 12.6516 14 12 14C11.3484 14 10.7129 13.9692 10.1006 13.9108ZM8.06286 13.598C8.21176 15.4676 8.61729 17.1371 9.1945 18.4151C6.8772 17.4003 5.21525 15.1666 5.01939 12.525C5.84231 12.9738 6.88001 13.3418 8.06286 13.598ZM13.9997 11.8896C13.369 11.9609 12.6993 12 12 12C11.3008 12 10.631 11.9609 10.0003 11.8896C10.0135 9.66408 10.4229 7.74504 10.9992 6.44832C11.2932 5.78673 11.5916 5.37516 11.8218 5.15605C11.9037 5.07812 11.9629 5.03659 12 5.01516C12.0371 5.03659 12.0963 5.07812 12.1782 5.15605C12.4084 5.37516 12.7068 5.78673 13.0008 6.44832C13.5771 7.74504 13.9865 9.66408 13.9997 11.8896ZM15.9946 11.5297C15.9415 9.20582 15.4965 7.11489 14.8055 5.58487C16.7528 6.43766 18.2373 8.15107 18.7779 10.244C18.5463 10.4638 18.1519 10.7341 17.5517 11.0008C17.1029 11.2003 16.5795 11.3798 15.9946 11.5297Z"
                fill="currentColor"
            />
        </svg>
    );
}