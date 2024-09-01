'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useSearchParams();
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setFullUrl(currentUrl);
    }
  }, [params]);

  return (
    <div>
      <p>Current URL: {fullUrl}</p>
    </div>
  )
}

export default Page
