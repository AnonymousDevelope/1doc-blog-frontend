import Image from 'next/image';
import styles from './footer.module.scss'; // Assuming you're using CSS modules
import { HeadphonesIcon, MailIcon, MapPinIcon, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { Link as CustomLink } from '@/i18n/navigation';
const Footer = () => {
  return (
    <footer className={`${styles.footer} text-foreground gap-4 w-full flex-col-reverse sm:flex-col bg-slate-50 dark:bg-slate-900/15`}>
      <div className="container border-b-[1px] border-b-slate-700 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First Part: Logo and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Image
                src="/1doc-logo.png"
                alt="Company Logo"
                width={50}
                height={50}
                className="w-auto"
              />
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              Innovative IT solutions for your business success.
            </p>
          </div>

          {/* Second Part: Contact Information */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <Link href="tel:1232345667" className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><HeadphonesIcon size={"20px"} /><span>Support: 123 234 56 67</span></Link>
            <Link href="mailto:ceo@1doc.uz" className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><MailIcon size={"20px"} /><span>Email: ceo@1doc.uz</span></Link>
            <Link href="mailto:info@1doc.uz" className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><MailIcon size={"20px"} /><span>Email: info@1doc.uz</span></Link>
            <Link href="tel:+15551234567" className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><PhoneCall size={"20px"} /><span>Phone: +1 (555) 123-4567</span></Link>
            <Link href="https://www.google.com/maps?q=123+Tech+St,+City" target="_blank" className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><MapPinIcon size={"20px"} /><span>Address: 123 Tech St, City</span></Link>

          </div>

          {/* Third Part: Quick Links (Placeholder) */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <CustomLink href={`/home`} className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Home</CustomLink>
            <CustomLink href={`/faq`} className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">FAQ</CustomLink>
            <CustomLink href={`/career`} className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Career</CustomLink>
            <CustomLink href={`/blog`} className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Blog</CustomLink>
            <CustomLink href={"/team"} className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Our team</CustomLink>
          </div>

          {/* Fourth Part: Social Media (Placeholder) */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-foreground ">Follow Us</h3>
            <div className="flex space-x-4">
              <Image src="/maps.jpeg" height={200} width={300} alt={"maps uzb"} />
            </div>
          </div>
        </div>
      </div>
      <div className="container sm:flex-row flex max-sm:border-b-[1px] max-sm:border-b-slate-700 mx-auto px-4 py-8">
        <p className="text-sm text-gray-800 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-300 ml-auto">
          Designed and Developed by Your Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;