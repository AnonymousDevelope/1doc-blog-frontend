import React from 'react';
import styles from './faq.module.scss';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
const Page = () => {
  const t = useTranslations("faq");
  const questions = t.raw("questions");
  return (
    <section className={`${styles.faq} dark:text-foreground`}>
      <div className="faq-header w-full h-auto bg-slate-200 dark:bg-gray-900/30 relative">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-3/4 w-full p-10 pe-0 flex flex-col">
            <h1 className="text-4xl font-bold max-md:text-center">FAQ</h1>
            <p className='mt-2 text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus alias earum perspiciatis obcaecati, maxime provident incidunt amet voluptatem cupiditate libero consequuntur quod illo. Possimus ea non ad harum nulla maiores autem, debitis distinctio quisquam nemo rerum saepe vero, veniam numquam perferendis tempora architecto deserunt molestias. Assumenda voluptatum beatae a laudantium? Reiciendis repudiandae optio totam. Similique unde repellat provident in molestias ullam maiores dignissimos, eaque quasi magni incidunt laudantium animi? Culpa accusamus nostrum porro maxime fugiat iste ut ullam amet, dicta illo magnam odit eius ipsa! Sunt itaque alias voluptatem veniam minima quae perspiciatis consequatur cupiditate, quibusdam dignissimos soluta nemo hic.</p>
          </div>
          <div className="md:w-1/4 hidden md:flex justify-center">
            <Image
              src="/faq/faq-header3.png"
              alt="FAQ Header"
              width={200} // Haqiqiy o‘lchamga moslashtiring
              height={200} // Haqiqiy o‘lchamga moslashtiring
              sizes="(max-width: 640px) 100vw, 33vw"
              quality={85}
              priority
              className="w-3/5 h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <div className="faq-body w-full px-4">
        <Accordion type="single" collapsible className="w-full text-start">
          {
            Object.entries(questions).map(([key]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className='text-start'>{t(`questions.${key}.question`)}</AccordionTrigger>
                <AccordionContent className='text-start text-slate-300'>{t(`questions.${key}.answer`)}</AccordionContent>
              </AccordionItem>  
            ))
          }
        </Accordion>
      </div>
    </section>
  );
};

export default Page;