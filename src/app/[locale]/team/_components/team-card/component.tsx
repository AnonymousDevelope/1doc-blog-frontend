import React from "react";
import { FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa"; // Ikonkalarni import qilish uchun

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  avatarUrl?: string; // Agar rasm bo‘lmasa, default placeholder ishlatiladi
  linkedinUrl?: string;
  telegramUrl?: string;
  instagramUrl?: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  description,
  avatarUrl,
  linkedinUrl,
  telegramUrl,
  instagramUrl,
}) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-card">
      {/* Avatar qismi */}
      <div
        className="w-32 h-32 rounded-full bg-cover bg-center mb-4 border-4 border-gray-200 dark:border-gray-700"
        style={{
          backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
          backgroundColor: !avatarUrl ? "#d1d5db" : "transparent", // Agar rasm bo‘lmasa, kulrang fon
        }}
      ></div>

      {/* Ism va lavozim */}
      <div className="text-center mb-3">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {name}
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {role}
        </p>
      </div>

      {/* Qisqa ta’rif */}
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 leading-relaxed">
        {description}
      </p>

      {/* Ijtimoiy tarmoqlar */}
      <div className="flex gap-4">
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
        {telegramUrl && (
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            <FaTelegram className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;