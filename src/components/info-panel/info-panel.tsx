"use client";
import "./info-panel.module.scss";
import React from 'react'
import { HeadphonesIcon, PhoneCallIcon, HourglassIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { BsTelegram } from "react-icons/bs";
import Link from "next/link";
const InfoPanel = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitted");
  }
  return (
    <>
      <div className="flex max-sm:hidden w-full gap-3 flex-row justify-between text-black dark:text-foreground">
        <div className="flex flex-row items-center gap-4 py-2">
          <HeadphonesIcon className="text-gray-600 " />
          <span>Texnik yordamlar uchun +998 99 999 99 99</span>
        </div>
        <div className="flex flex-row items-center gap-4 py-2">
          <PhoneCallIcon className="text-gray-600 " />
          <span>Texnik yordamlar uchun +998 99 999 99 09</span>
        </div>
        <div className="flex flex-row items-center gap-4 py-2">
          <HourglassIcon className="text-gray-600 " />
          <span>Ish vaqtimiz 8:00 - 18:00</span>
        </div>
        <div className="flex flex-row items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Bog'lanish</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Biz bilan bog'lanish</DialogTitle>
                <DialogDescription>Biz bilan bog'lanish uchun ma'lumotlaringizni kiriting.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fio">To'liq ism</Label>
                  <Input id="fio" placeholder="To'liq ism sharifingiz ..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tel">Telefon raqam</Label>
                  <Input id="tel" type="tel" placeholder="Telefon raqamingiz ..." required />
                </div>
                <DialogFooter className="justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Yopish</Button>
                  </DialogClose>
                  <Button type="submit" variant="default">Jo'natish</Button>
                </DialogFooter>
              </form>
              <div className="flex flex-col gap-4 items-center">
                <span>Qo'shimcha bog'lanish uchun</span>
                <div className="flex gap-4">
                  <Link href="https://t.me/techsupportuz" target="_blank">
                    <Button variant="ghost" asChild>
                      <BsTelegram size={40} />
                    </Button>
                  </Link>
                  <Link href="tel:+99899999999">
                    <Button variant="ghost" asChild>
                      <PhoneCallIcon size={40} />
                    </Button>
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default InfoPanel;