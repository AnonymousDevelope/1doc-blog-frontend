import React from "react";
import { FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa"; // Ikonkalarni import qilish uchun
import type { Team } from "@/api/types/teamTypes";
const TeamMemberCard: React.FC<Team> = ({
  name,
  image,
  description,
  position,
  linkedin,
  telegram,
  instagram,
}:Team) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-card">
      {/* Avatar qismi */}
      <div
        className="w-32 h-32 rounded-full bg-cover bg-center mb-4 border-4 border-gray-200 dark:border-gray-700"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundColor: !image ? "#d1d5db" : "transparent", // Agar rasm bo‘lmasa, kulrang fon
        }}
      ></div>

      {/* Ism va lavozim */}
      <div className="text-center mb-3">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {name}
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {position}
        </p>
      </div>

      {/* Qisqa ta’rif */}
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 leading-relaxed">
        {description}
      </p>

      {/* Ijtimoiy tarmoqlar */}
      <div className="flex gap-4">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
        {telegram && (
          <a href={telegram} target="_blank" rel="noopener noreferrer">
            <FaTelegram className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;