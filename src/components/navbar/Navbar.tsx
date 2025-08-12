"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { useLanguage } from "@/context/language.context";
import { useTheme } from "@/context/theme.context";
import { useTranslations } from "next-intl";

interface NavbarItem {
  id: number;
  name: string;
  link: string;
}

const Navbar = () => {
  const t = useTranslations("header");
  const { language: contextLanguage, changeLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const selectedLanguage = locale;
  useEffect(() => {
    if (selectedLanguage !== contextLanguage) {
      changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, contextLanguage, changeLanguage]);

  const handleLanguageChange = (lang: string) => {
    const cleanPathname = pathname.replace(`/${locale}`, "");
    router.push(cleanPathname || "/", { locale: lang });
    changeLanguage(lang);
  };

  const navbarItems: NavbarItem[] = [
    { id: 1, name: t("navbar.home"), link: "/" },
    { id: 2, name: t("navbar.faq"), link: "/faq" },
    { id: 3, name: t("navbar.blog"), link: "/blog" },
    { id: 4, name: t("navbar.career"), link: "/career" },
  ];

  const isActive = (link: string) => {
    const normalizedPathname = pathname.replace(`/${locale}`, "").replace(/\/$/, "");
    const normalizedLink = link.replace(/\/$/, "");
    if (normalizedLink === "") {
      return normalizedPathname === "";
    }
    return normalizedPathname.startsWith(normalizedLink) && normalizedPathname !== "";
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="sm:hidden fixed right-4 top-1/2 z-[1000] -translate-y-1/2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✕" : "☰"}
      </Button>

      <nav
        className={`${styles.navbar} sticky top-0 border-b-2 border-background dark:border-gray-800 shadow-md dark:shadow-gray-800/50 z-50`}
      >
        <div className="flex w-full items-center justify-between px-4 py-2 mx-auto ">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/1doc-logo.png" width={40} height={40} alt="1Doc Logo"  />
              <span className="font-bold text-2xl md:text-3xl ">Doc</span>
            </Link>
          </div>
          <ul
            className={`sm:flex sm:gap-8 sm:items-center max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-2/3 max-sm:mt-5 max-sm:flex-col max-sm:p-4 max-sm:rounded-lg max-sm:border dark:max-sm:border-gray-800 bg-background/90 max-sm:backdrop-blur-[10px] z-40 sm:bg-transparent max-sm:shadow-md dark:max-sm:shadow-gray-700/50 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-sm:translate-x-3" : "max-sm:-translate-x-[calc(100%+20px)]"
            }`}
          >
            {navbarItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`text-lg hover:text-gray-600 ${isActive(item.link) ? styles.active : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center gap-3">
            <Select defaultValue={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px] md:w-[180px] bg-transparent outline-none border-none focus:ring-0">
                <SelectValue placeholder={t(`languages.${selectedLanguage}`)} />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "uz", flag: "/uzbekistan-flag-icon.svg" },
                  { value: "en", flag: "/united-kingdom-flag-icon.svg" },
                  { value: "ru", flag: "/russia-flag-icon.svg" },
                  { value: "qq", flag: "/qaraqalpoq-flag-icon.svg" },
                  { value: "uz-kr", flag: "/uzbekistan-flag-icon.svg" },
                ].map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={lang.flag}
                        alt={`${t(`languages.${lang.value}`)} flag`}
                        height={20}
                        width={20}
                      />
                      <span>{t(`languages.${lang.value}`)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Button onClick={toggleTheme} variant="outline" size="sm">
              {theme === "dark" ? <SunIcon className="!w-5 !h-5" /> : <MoonIcon className="!w-5 !h-5" />}
            </Button> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;