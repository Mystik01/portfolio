// src/components/Tracker.jsx

'use client'; 
import { useSearchParams, useRouter } from 'next/navigation'; // 👈 Import useRouter
import { useEffect } from 'react';
import { track } from '@vercel/analytics/react'; 

export default function Tracker() {
  const searchParams = useSearchParams();
  const router = useRouter(); // 👈 Initialize useRouter

  useEffect(() => {
    const customId = searchParams.get('id');

    if (customId === '20x25') {
      // 1. FIRE TRACKING EVENT (Happens first)
      track('CV_Link_Click', {
        source: 'CV_Application', 
        campaign: 'work',
      });
      
      // 2. REMOVE QUERY PARAMETERS (Happens immediately after)
      // Replace the current URL with the clean root path ('/')
      // The shallow option is not needed/supported in the App Router for this type of navigation,
      // but router.replace('/') is the correct method.
      router.replace('/'); 
    }
  }, [searchParams, router]); 

  return null;
}