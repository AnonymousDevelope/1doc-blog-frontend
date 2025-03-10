/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter, usePathname, Link } from "@/i18n/navigation"; // navigation.ts dan import
import { useLocale } from "next-intl"; // useLocale ni import qilish
import { Button } from "../ui/button";
import { useLanguage } from "@/context/language.context";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/context/theme.context";

interface NavbarItem {
  id: number;
  name: string;
  link: string; // Faqat sahifa qismi (locale'siz)
}

const Navbar = () => {
  const { language: contextLanguage, changeLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // useLocale bilan joriy locale ni olish
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // Tilni URLdan olish va context bilan sinxronlashtirish
  const selectedLanguage = locale;

  useEffect(() => {
    if (selectedLanguage !== contextLanguage) {
      changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, contextLanguage, changeLanguage]);

  // Til o'zgarganda URLni yangilash
  const handleLanguageChange = (lang: string) => {
    const cleanPathname = pathname.replace(`/${locale}`, ""); // Joriy locale ni olib tashlash
    router.push(cleanPathname || "/", { locale: lang }); // Agar yo‘l bo‘sh bo‘lsa, root ga yo‘naltirish
    changeLanguage(lang);
  };
  // Navbar elementlari (locale'siz)
  const navbarItems: NavbarItem[] = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "FAQ", link: "/faq" },
    { id: 3, name: "News", link: "/news" },
    { id: 4, name: "Career", link: "/career" },
  ];

  // Active holatni tekshirish
  const isActive = (link: string) => {
    const normalizedPathname = pathname.replace(`/${locale}`, "").replace(/\/$/, ""); // locale va trailing slashni olib tashlash
    const normalizedLink = link.replace(/\/$/, ""); // trailing slashni olib tashlash
    return normalizedPathname === normalizedLink || (normalizedPathname === "" && link === "");
  };

  return (
    <nav className={`${styles.navbar} sticky top-0 border-b-2 border-background bg-background dark:border-gray-800 shadow-md dark:shadow-gray-800/50 z-50`}>
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
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold text-2xl md:text-3xl">1Doc</span>
            <Image src="/1doc-logo.png" width={40} height={40} alt="1Doc Logo" />
          </Link>
        </div>
        {/* Navigation Links */}
        <ul
          className={`sm:flex sm:gap-8 sm:items-center max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-2/3 max-sm:mt-5 max-sm:flex-col max-sm:p-4 max-sm:rounded-lg max-sm:border dark:max-sm:border-gray-800 max-sm:bg-gray-50 max-sm:dark:bg-gray-900 sm:bg-transparent max-sm:shadow-md dark:max-sm:shadow-gray-700/50 transition-all duration-300 ease-in-out ${isMenuOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-[calc(100%+20px)]"
            }`}
        >
          {navbarItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link} // `/${locale}/${item.link}` o‘rniga faqat `item.link`
                className={`text-lg hover:text-gray-600 ${isActive(item.link) ? styles.active : ""}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Language Selector */}
        <div className="flex flex-row items-center gap-3">
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
          <Button onClick={toggleTheme} variant="outline" size="sm">
            {theme === "dark" ? <SunIcon className="!w-5 !h-5" /> : <MoonIcon className="!w-5 !h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;