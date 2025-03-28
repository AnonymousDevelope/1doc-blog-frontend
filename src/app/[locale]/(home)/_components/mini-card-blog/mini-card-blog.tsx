import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image'
interface Card {
    src: string;
    alt: string;
    link: string;
    title: string;
    description: string;
}
const MiniCardBlog: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div
            className="group flex flex-col items-center sm:h-80 h-96 bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
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
                <Link href={`/blog/${card.title.split(" ").join("-")}`} target="_blank" className="mt-4">
                    <Button>Подробнее</Button>
                </Link>
            </div>
        </div>
    );
}

export default MiniCardBlog