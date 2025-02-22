"use client"
import React from 'react'
import styles from "./navbar.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
interface NavbarProps {
  id: number,
  name: string,
  link: string,
}
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navbarList: NavbarProps[] = [
    {
      id: 1,
      name: 'Home',
      link: '/'
    },
    {
      id: 2,
      name: 'FAQ',
      link: "/faq"
    },
    {
      id: 3,
      name: "News",
      link: "/news"
    },
    {
      id: 4,
      name: "Career",
      link: "/career"
    }
  ]
  return (
    <div className={`${styles.navbar} sticky navbar border-b-gray-800 border-b-2 shadow-sm shadow-gray-900 flex w-full `}>
      <Button
            variant="outline"
            size="icon"
            className="fixed top-1/2 right-4 z-50 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </Button>

      <ul className='flex w-full items-center flex-row justify-between'>
        <div className="navbar-brand">
          <li className="flex flex-row gap-3 items-center">
            <span className=' font-bold text-[34px]'>1Doc</span>
            <Link href="https://1doc.uz">
              <Image src="/1doc-logo.png" width={40} height={40} alt='1Doc' />
            </Link>
          </li>
        </div>
        <div className="relative max-sm:absolute max-sm:w-full">
          {/* Hamburger Button */}
          {/* Navigation Menu */}
          <ul
            className={`transition-all rounded-md sm:transition-none duration-500 ease-in-out flex gap-3 
          sm:flex-row sm:relative 
          max-sm:absolute max-sm:w-full max-sm:p-[10px] max-sm:bg-slate-900 max-sm:flex-col max-sm:top-16
          ${isMenuOpen ? "left-0" : "-left-[120%]"}`}
          >
            {navbarList.map((item) => (
              <li key={item.id} className="text-lg">
                <Link href={item.link} className="hover:text-gray-600">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="last">
          <li>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tilni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uz">
                  <div className="flex flex-row gap-2">
                    <Image src="/uzbekistan-flag-icon.svg" alt="lang" height={20} width={20} />
                    <span>Uzbek</span>
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex flex-row gap-2">
                    <Image src="/united-kingdom-flag-icon.svg" alt="lang" height={20} width={20} />
                    <span>English</span>
                  </div>
                </SelectItem>
                <SelectItem value="ru">
                  <div className="flex flex-row gap-2">
                    <Image src="/russia-flag-icon.svg" alt="lang" height={20} width={20} />
                    <span>Russian</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Navbar