"use client";
import "./info-panel.scss";
import React from 'react'
import { useTranslations } from "next-intl";
import { Headphones, PhoneCall, Clock, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import ContactForm from "../contact-form/contact-form";

const InfoPanel = () => {
  const t = useTranslations("info_panel");
  const tContact = useTranslations("contact");
  
  return (
    <>
      {/* Desktop Info Panel */}
      <section className="info-panel hidden sm:block bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3 text-sm">
              <Headphones className="h-4 w-4 text-muted-foreground" />
              <span>{t("support")}: +998 99 999 99 99</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
              <span>{t("support")}: +998 99 999 99 09</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{t("working_hours")}: 8:00 - 18:00</span>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  {t("connect")}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[625px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>{tContact("title")}</DialogTitle>
                  <DialogDescription>
                    {tContact("description")}
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Mobile Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              <Phone className="h-6 w-6" />
              <span className="sr-only">{t("connect")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[625px] rounded-lg">
            <DialogHeader>
              <DialogTitle>{tContact("title")}</DialogTitle>
              <DialogDescription>
                {tContact("description")}
              </DialogDescription>
            </DialogHeader>
            <ContactForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default InfoPanel;