import Image from "next/image";
import React from "react";

const Career = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full bg-blue-300 dark:bg-gray-800 px-4 py-6 sm:px-6 md:px-10 lg:px-16 min-h-[350px] md:h-auto gap-6">
      {/* Matn bo‘limi */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center md:text-left">
          Karyerani 1Doc bilan boshlang.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit id distinctio omnis voluptas praesentium
          accusamus eaque, officiis quae? Voluptas odit molestiae molestias deleniti repudiandae illum modi natus ea
          dolores quidem, nemo, hic nisi numquam harum! Totam distinctio, ab pariatur inventore laborum porro vero
          voluptatem et aliquid, laboriosam, quaerat dignissimos optio nemo dolorum perferendis maxime eaque nihil fuga
          sunt eius ipsum.
        </p>
      </div>
      {/* Rasm bo‘limi */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src="/career/career.png"
          width={300}
          height={300}
          alt="Career Image"
          className="object-cover rounded-md max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Career;