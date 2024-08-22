"use client"

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
            <h1 className="text-2xl font-bold">Redirecting to English site...</h1>
        </div>
    );
}
