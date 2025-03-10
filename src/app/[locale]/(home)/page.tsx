"use client"
import { Button } from "@/components/ui/button";
import { DialogContent, DialogClose, DialogHeader, DialogTrigger, Dialog, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as LinkNavigation } from "@/i18n/navigation";
import Link from "next/link";
import { PhoneCallIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BsTelegram } from "react-icons/bs";
import Image from "next/image";
import "./page.scss";
import { useRouter } from "next/navigation";
import CardOportunity from "./_components/card-oportunity/card-oportunity";
interface CardOpportunity {
  image: string,
  title: string,
  description: string
}
const Page = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitted");
  }

  const tags = [
    "Yuristlar",
    "Hujjatlar",
    "Suniy Intelekt",
    "Shifrlash",
    "Davron",
    "Yuristlar",
    "Hujjatlar",
    "Suniy Intelekt",
    "Shifrlash",
    "Davron",
  ]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const duplicatedtags = [...tags, ...tags];
  const cards = [
    { src: "/card-1.jpg", alt: "Business Solution 1", link: "#", title: "Solution 1", description: "Description for Solution 1" },
    { src: "/card-2.jpg", alt: "Business Solution 2", link: "#", title: "Solution 2", description: "Description for Solution 2" },
    { src: "/card-3.jpg", alt: "Business Solution 3", link: "#", title: "Solution 3", description: "Description for Solution 3" },
    { src: "/card-2.jpg", alt: "Business Solution 4", link: "#", title: "Solution 4", description: "Description for Solution 4" },
  ];
  const card_oportunities: CardOpportunity[] = [
    {
      image: "/imkoniyatlar/imzo.png",
      title: "1Doc - Imzo",
      description: "1Doc - Biz bilan qanday ikoniyatlarga ega bo'lasiz"
    },
    {
      image: "/imkoniyatlar/lock-doc.png",
      title: "1Doc - Hujjat Lock",
      description: "1Doc - Biz bilan qanday ikoniyatlarga ega bo'lasiz"
    },
    {
      image: "/imkoniyatlar/ocr.png",
      title: "1Doc - OCR",
      description: "1Doc - Biz bilan qanday ikoniyatlarga ega bo'lasiz"
    }
  ]
  return (
    <div className="container home mx-auto px-4 dark:text-foreground transition-all ease-in-out delay-100">
      <section className="grid grid-cols-1 sm:grid-cols-[2fr_1.25fr] gap-8 items-center min-h-[80vh]">
        <div className="space-y-4">
          <div className="slider-container">
            <h3>1Doc - </h3>
            <div className="words">
              <span>creativlik,</span>
              <span>innovatsiya,</span>
              <span>motivatsiya,</span>
              <span>natija!</span>
            </div>
          </div>
          <div className="flex xs:flex-row max-md:justify-center gap-3">
            <div className="flex flex-row items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="!border-foreground min-h-[48px] min-w-[184px] text-[16px]">Bog&apos;lanish</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Biz bilan bog&apos;lanish</DialogTitle>
                    <DialogDescription>Biz bilan bog&apos;lanish uchun ma&apos;lumotlaringizni kiriting.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fio">To&apos;liq ism</Label>
                      <Input id="fio" placeholder="To&apos;liq ism sharifingiz ..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tel">Telefon raqam</Label>
                      <Input id="tel" type="tel" placeholder="Telefon raqamingiz ..." required />
                    </div>
                    <DialogFooter className="justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Yopish</Button>
                      </DialogClose>
                      <Button type="submit" variant="default">Jo&apos;natish</Button>
                    </DialogFooter>
                  </form>
                  <div className="flex flex-col gap-4 items-center">
                    <span>Qo&apos;shimcha bog&apos;lanish uchun</span>
                    <div className="flex gap-4">
                      <Link href="https://t.me/techsupportuz" target="_blank">
                        <Button variant="ghost" className="px-4 py-2">
                          <BsTelegram className="!h-[30px] !w-[30px]" />
                        </Button>
                      </Link>
                      <Link href="tel:+99899999999">
                        <Button variant="ghost" className="px-4 py-2">
                          <PhoneCallIcon className="!h-[30px] !w-[30px]" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Button variant="default" size={"sm"} className="!border-foreground min-h-[48px] min-w-[184px] text-[16px]" onClick={() => router.push('/blog')}>
              <Link href={"/"}></Link>
              Bloglar
            </Button>
          </div>
        </div>
        <div className="mx-auto w-[600px] h-auto rounded-lg">
          <Image
            src="/home/header.png"
            alt="Hero Image"
            width={600} // Kattaroq kenglik
            height={600} // Kattaroq balandlik
            quality={100} // Maksimal sifat (default 75)
            className="rounded-lg object-cover"
          />
        </div>
      </section>
      <section className="flex flex-col px-5 py-12 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-roboto font-bold mb-10 text-foreground">
            TrustMe — IT-решение по оптимизации бизнеса
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group flex flex-col items-center h-64 bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={card.src}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={card.alt}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 w-full flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                  <Link href={card.link} target="_blank" className="mt-4">
                    <Button>Подробнее</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center mt-10">
            <Button variant={"outline"} className="rounded-full border-2 mx-auto" size={"lg"}>
              <LinkNavigation href={"/blog"}>Barchasini ko&apos;rish</LinkNavigation>
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full h-auto mx-auto py-8 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-roboto font-bold mb-10 text-foreground">
            1Doc - Biz bilan qanday ikoniyatlarga ega bo&apos;lasiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-12 sm:px-5 md:px-12">
            {
              card_oportunities.map((card, index) => (
                <CardOportunity key={index} image={card.image} title={card.title} description={card.description} />
              ))
            }
          </div>
        </div>
      </section >
      <section className="w-full h-auto md:h-[100px] mx-auto py-8 overflow-hidden">
        <div className="continuous-slider">
          <div className="slider-track">
            {duplicatedtags.map((tags, index) => (
              <div key={index} className="slide w-fit">
                <div className="relative w-full h-auto rounded-lg overflow-hidden">
                  <div className="w-fit px-4 py-3 border-2 border-slate-700 rounded-xl">
                    {tags}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
};

export default Page;