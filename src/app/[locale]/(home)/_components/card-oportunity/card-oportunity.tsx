import Image from 'next/image'
import React from 'react'
import "./card-oportunity.scss";
const CardOportunity = ({ image, title, description }: {
    image?: string,
    title?: string,
    description?: string
}) => {
    return (
        <div className="card-oportunity">
            <div className="w-2/5 h-full flex items-center">
                <Image src={image ? image : "/card-1.jpg"} className="w-full" alt="1Doc Logo" width={100} height={100} />
            </div>
            <div className="card-content">
                <h3 className="italic text-[21px] font-semibold text-foreground">{title ? title : "Title"}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description ? description : "Description"}</p>
            </div>
        </div>
    )
}

export default CardOportunity