"use client"
import React, { useState } from 'react';
import Image from 'next/image'; // Next.js Image komponenti, agar boshqa framework ishlatayotgan bo‘lsangiz, o‘zgartirishingiz mumkin

const Ad = () => {
  // Reklama holatini boshqarish uchun state
  const [isLeftAdVisible, setIsLeftAdVisible] = useState(true);
  // Chap reklama yopish funksiyasi
  const handleCloseLeftAd = () => {
    setIsLeftAdVisible(false);
  };

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