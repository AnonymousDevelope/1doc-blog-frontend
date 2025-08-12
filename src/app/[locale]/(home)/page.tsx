"use client";
import React, { useState, useEffect } from "react";
import "./page.scss";
import { Button } from "@/components/ui/button";
import autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as LinkNavigation } from "@/i18n/navigation";
import { ArrowRight, Shield, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
const Page = () => {
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
  return (
    <div className="home container mx-auto px-4 dark:text-foreground transition-all ease-in-out delay-100">
      {}
      <section className="py-20 lg:py-32">
        <div className="mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-between">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-900 text-blue-300 hover:bg-blue-900">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {t("hero.title")}
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {" "}
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  {t("hero.ctaSecondary")}
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {t("hero.stats.projects.number")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("hero.stats.projects.label")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {t("hero.stats.satisfaction.number")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("hero.stats.satisfaction.label")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {t("hero.stats.support.number")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("hero.stats.support.label")}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative w-fit bg-background/50 rounded-3xl shadow-2xl p-8 border border-slate-700 float-end">
                <Image
                  src="/home/1doc.jpg"
                  alt="Business Dashboard"
                  width={500}
                  height={400}
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-background/80 shadow container">
        <div className="mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-indigo-900 text-indigo-300">
              {t("features.badge")}
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              {t("features.title")}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t("features.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, color: "from-blue-500 to-indigo-500", key: 0 },
              { icon: Shield, color: "from-green-500 to-emerald-500", key: 1 },
              { icon: Users, color: "from-purple-500 to-pink-500", key: 2 },
              { icon: TrendingUp, color: "from-orange-500 to-red-500", key: 3 },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="bg-slate-900 border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {t(`features.items.${idx}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-slate-300">
                    {t(`features.items.${idx}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-background/80 shadow container">
        <div className="slider-container">
          <div className="mx-auto">
            <div className="text-center space-y-4 ">
              <Badge className="bg-indigo-900 text-indigo-300">
                Loyihamiz genofondi
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                {t("slider.title")}:
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Biz har bir loyihaga individual yondashuv va yuqori sifatli
                xizmat ko&apos;rsatishni kafolatlaymiz
              </p>
            </div>
          </div>
          <div className="words">
            {words.map((word, index) => (
              <span
                key={index}
                style={{ animationDelay: `${(index - 1) * 2}s` }}
              >
                {t(`slider.words.${word}`)}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col px-5 py-12 bg-background/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center font-roboto font-bold mb-10 text-foreground">
            So&apos;ngi yangiliklar
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
              <LinkNavigation href="/blog">
                Barchasini ko&apos;rish
              </LinkNavigation>
            </Button>
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
