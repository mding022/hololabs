"use client"

/* Add logic to check if user is signed in to cookies. If user is, route to different page.
Don't make user route to home onboarding page each time */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/en/home');
        }, 0);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Redirecting to EN HoloLabs</h1>
        </div>
    );
}
