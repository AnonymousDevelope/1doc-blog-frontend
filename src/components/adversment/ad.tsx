"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./ad.scss";

const Ad = () => {
  // Reklama holatini boshqarish uchun state (dastlab null)
  const [isLeftAdVisible, setIsLeftAdVisible] = useState<boolean | null>(null);
  useEffect(() => {
    // Cookie tekshiruvi
    const isAdHidden:boolean = document.cookie.includes("isLeftAdVisible=false");
    setIsLeftAdVisible(!isAdHidden); // Agar cookie'da yashirish belgisi bo'lsa false, aks holda true
  }, []);
  // Chap reklama yopish funksiyasi
  const handleCloseLeftAd = () => {
    setIsLeftAdVisible(false);
    // Cookie'ni o'rnatish (1 kunlik muddat)
    document.cookie = "isLeftAdVisible=false; max-age=86400; path=/";
  };

  // Agar isLeftAdVisible null bo'lsa, hech narsa ko'rsatmaymiz (cookie tekshiruvi hali tugamagan)
  if (isLeftAdVisible === null) {
    return null; // Yoki placeholder ko'rsatishingiz mumkin: <div>Loading...</div>
  }
  return (
    <div className="w-full flex justify-between">
      {/* Chapdagi reklama */}
      {isLeftAdVisible && (
        <div className="w-full rounded-lg bg-slate-300 md:w-full flex justify-center relative">
          <div className="relative">
            <button
              onClick={handleCloseLeftAd}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
            <Image
              src="/home/reklama.png"
              width={300}
              height={300}
              alt="Career Image"
              className="object-cover rounded-md max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ad;