import React from 'react'
import styles from "./footer.module.scss";
import { useTranslations } from 'next-intl';
const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className={`${styles.footer} dark:text-foreground`}>{t("title")}</div>
  )
}

export default Footer