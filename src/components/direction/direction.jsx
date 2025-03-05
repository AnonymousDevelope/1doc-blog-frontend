'use client'; // Client-side rendering uchun kerak, chunki usePathname client-side hook
import React from 'react';
import { usePathname, useParams } from 'next/navigation'; // Next.js app router hooklari
import styles from './direction.module.scss';

const Direction = () => {
  const pathname = usePathname(); // Joriy yo'lni oladi (masalan, "/en/home/faq")
  const { locale } = useParams(); // Dinamik [locale] parametrini oladi (masalan, "en")

  const generatePaths = () => {
    // Locale'dan keyingi qismlarni ajratish
    const pathSegments = pathname.split('/').filter(segment => segment && segment !== locale);
    let cumulativePath = `/${locale}`; // Locale bilan boshlanadi

    return pathSegments.map((segment) => {
      cumulativePath += `/${segment}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '), // Kebab-case ni bo'shliqqa aylantirish
        url: cumulativePath,
      };
    });
  };

  const paths = generatePaths();

  return (
    <nav className={styles.direction}>
      {paths.map((path, index) => (
        <span key={index} className={styles.pathItem}>
          <a href={path.url} className={styles.link}>
            {path.label}
          </a>
          {index < paths.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Direction;