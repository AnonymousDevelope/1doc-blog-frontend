"use client";
import React, { useState, useEffect } from "react";
import "./page.scss";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as LinkNavigation } from "@/i18n/navigation";
import Link from "next/link";
import { PhoneCallIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BsTelegram } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CardOportunity from "./_components/card-oportunity/card-oportunity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MiniCardBlog from "./_components/mini-card-blog/mini-card-blog";
import CarouselCard from "./_components/carousel-card/carousel-card";
import { getBlogs } from "@/api/services/blogService";
import { Blog } from "@/api/types/blogTypes";
interface CardOpportunity {
  title: string;
  description: string;
}
const Page = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("home");
  const [cards, setCards] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogs(1, 4, locale);
        setCards(response.blogs || []);
      } catch (err) {
        setError("Failed to load blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [locale]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitted");
  };
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
  ];
  const duplicatedTags = [...tags, ...tags];
  const words: string[] = [
    "simplicity",
    "innovation",
    "accessibility",
    "reliability",
    "efficiency",
    "trust",
    "technology",
    "transparency",
    "empowerment",
    "transformation",
  ];
  const card_oportunities: Record<string, CardOpportunity> = t.raw("cards");
  return (
    <div className="container home mx-auto px-4 dark:text-foreground transition-all ease-in-out delay-100">
      {}
      <section className="grid grid-cols-1 sm:grid-cols-[2.25fr_1fr] gap-8 items-end min-h-[50vh]">
        <div className="space-y-4">
          <div className="slider-container">
            <h3>{t("slider.title")}:</h3>
            <div className="words">
              {words.map((word, index) => (
                <span key={index}>{t(`slider.words.${word}`)}</span>
              ))}
            </div>
          </div>
          <div className="flex xs:flex-row max-md:justify-center gap-3">
            <div className="flex flex-row items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="!border-foreground min-h-[48px] min-w-[184px] text-[16px]"
                  >
                    Bog&apos;lanish
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Biz bilan bog‘lanish</DialogTitle>
                    <DialogDescription>
                      Biz bilan bog‘lanish uchun ma’lumotlaringizni kiriting.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fio">To&apos;liq ism</Label>
                      <Input
                        id="fio"
                        placeholder="To'liq ism sharifingiz ..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tel">Telefon raqam</Label>
                      <Input
                        id="tel"
                        type="tel"
                        placeholder="Telefon raqamingiz ..."
                        required
                      />
                    </div>
                    <DialogFooter className="justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Yopish
                        </Button>
                      </DialogClose>
                      <Button type="submit" variant="default">
                        Jo&apos;natish
                      </Button>
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
            <Button
              variant="default"
              size="sm"
              className="!border-foreground min-h-[48px] min-w-[184px] text-[16px]"
              onClick={() => router.push("/blog")}
            >
              Bloglar
            </Button>
          </div>
        </div>
        <div className="mx-auto w-auto md:w-[600px] h-auto rounded-lg">
          <Image
            src="/home/laptop-1doc.jpg"
            alt="Hero Image"
            width={600}
            height={600}
            quality={100}
            className="rounded-lg object-cover"
            onError={(e) => (e.currentTarget.src = "/home/placeholder.jpg")}
          />
        </div>
      </section>
      {}
      <section className="flex flex-col px-5 py-12 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-roboto font-bold mb-10 text-foreground">
            TrustMe — IT-решение по оптимизации бизнеса
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <React.Fragment key={index}>
                    <MiniCardBlog card={card} />
                  </React.Fragment>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
                  No blogs available
                </p>
              )}
            </div>
          )}
          <div className="flex flex-row justify-center mt-10">
            <Button
              variant="outline"
              className="rounded-full border-2 mx-auto"
              size="lg"
            >
              <LinkNavigation href="/blog">Barchasini ko&quote;rish</LinkNavigation>
            </Button>
          </div>
        </div>
      </section>
      {}
      <section className="w-full h-auto mx-auto py-8 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-roboto font-bold mb-10 text-foreground">
            {t("sectionTitle.mainTitle")}
            <br />{" "}
            <span
              className="italic"
              style={{ fontFamily: "Tiempos, Georgia, sans-serif" }}
            >
              {t("sectionTitle.italicPart")}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-12 sm:px-5 md:px-6">
            {Object.entries(card_oportunities).map(([key, value]) => (
              <CardOportunity
                key={key}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>
      {}
      <section className="w-[calc(100%-4rem)] h-auto mt-4 mx-auto">
        <Carousel
          plugins={[
            autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((item) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/2 cursor-pointer"
                key={item}
              >
                <CarouselCard>{item}</CarouselCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {}
      <section className="w-full h-auto md:h-[100px] mx-auto py-8 overflow-hidden">
        <div className="continuous-slider">
          <div className="slider-track">
            {duplicatedTags.map((tag, index) => (
              <div key={index} className="slide w-fit">
                <div className="relative w-full h-auto rounded-lg overflow-hidden">
                  <div className="w-fit px-4 py-3 border-2 border-slate-700 rounded-xl">
                    {tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Page;