/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLanguage } from "@/context/language.context";
import { useLocale } from "next-intl";

interface NavbarItem {
  id: number;
  name: string;
  link: string; // Faqat sahifa qismi (locale'siz)
}

const Navbar = () => {
  const { language: contextLanguage, changeLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tilni URLdan olish va context bilan sinxronlashtirish
  const selectedLanguage = pathname.split("/")[1] || "uz";

  useEffect(() => {
    if (selectedLanguage !== contextLanguage) {
      changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, contextLanguage, changeLanguage]);

  // Til o'zgarganda URLni yangilash
  const handleLanguageChange = (lang: string) => {
    const currentPath = pathname.split("/").slice(2).join("/") || ""; // locale'dan keyingi qism
    const newPath = `/${lang}/${currentPath}`;
    router.push(newPath);
    changeLanguage(lang);
  };

  // Navbar elementlari (locale'siz)
  const navbarItems: NavbarItem[] = [
    { id: 1, name: "Home", link: "" }, // Root sahifa uchun bo'sh qoldiramiz
    { id: 2, name: "FAQ", link: "faq" },
    { id: 3, name: "News", link: "news" },
    { id: 4, name: "Career", link: "career" },
  ];

  // Active holatni tekshirish
  const isActive = (link: string) => {
    const fullLink = `/${locale}/${link}`.replace(/\/$/, ""); // trailing slashni olib tashlash
    const normalizedPathname = pathname.replace(/\/$/, ""); // trailing slashni olib tashlash
    if (!pathname || normalizedPathname === `/${locale}`) {
      return link === ""; // Home faqat rootda active
    }
    return normalizedPathname === fullLink;
  };

  return (
    <nav className={`${styles.navbar} sticky top-0 border-b-2 dark:bg-background border-gray-800 shadow-sm shadow-gray-900 z-50`}>
      <Button
        variant="outline"
        size="icon"
        className="sm:hidden fixed right-4 top-1/2 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✕" : "☰"}
      </Button>

      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="font-bold text-2xl md:text-3xl">1Doc</span>
            <Image src="/1doc-logo.png" width={40} height={40} alt="1Doc Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul
          className={`sm:flex sm:gap-6 max-sm:rounded-md sm:items-center max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-full max-sm:bg-slate-900 max-sm:flex-col max-sm:p-4 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-[calc(100%+20px)]"
          }`}
        >
          {navbarItems.map((item) => {
            const fullLink = `/${locale}/${item.link}`.replace("//", "/"); // Home uchun ikkita slashni tozalash
            return (
              <li key={item.id}>
                <Link
                  href={fullLink}
                  className={`text-lg hover:text-gray-600 ${isActive(item.link) ? styles.active : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Language Selector */}
        <Select defaultValue={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[140px] md:w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {[
              { value: "uz", flag: "/uzbekistan-flag-icon.svg", label: "Uzbek" },
              { value: "en", flag: "/united-kingdom-flag-icon.svg", label: "English" },
              { value: "ru", flag: "/russia-flag-icon.svg", label: "Russian" },
            ].map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                <div className="flex items-center gap-2">
                  <Image src={lang.flag} alt={`${lang.label} flag`} height={20} width={20} />
                  <span>{lang.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};

export default Navbar;