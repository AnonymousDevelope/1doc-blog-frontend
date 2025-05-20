import Image from "next/image";
import React, { useState } from "react";
import "./card-oportunity.scss";
import { useTranslations } from "next-intl";

const CardOportunity = ({
  image,
  title,
  description,
}: {
  image?: string;
  title?: string;
  description?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Matnni ko'rsatish/yashirish holati
  const t = useTranslations("home"); // Tarjima uchun
  const common = t.raw("common"); // Common tarjimasi
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card-oportunity">
      <div className="header">
        <div className="icon" />
        <span>Yakka Tartibdagi NT</span>
      </div>
      <div className="image-container">
        <Image
          src={image || "/card-1.jpg"}
          alt="1Doc Opportunity"
          width={300}
          height={150}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="card-content">
        <h3>{title || "Title"}</h3>
        <div className={`description-wrapper ${isExpanded ? "expanded" : ""}`}>
          <p>{description || "Description"}</p>
          <button onClick={toggleExpand} className="toggle-link">
            {isExpanded ? common["hide"] : common["showMore"]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardOportunity;