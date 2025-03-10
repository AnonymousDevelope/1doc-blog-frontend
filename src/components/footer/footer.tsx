import Image from 'next/image';
import styles from './footer.module.scss'; // Assuming you're using CSS modules
import { HeadphonesIcon, MailIcon, MapPinIcon, PhoneCall } from 'lucide-react';

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
            <p className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><MailIcon size={"20px"} /><span>Email: info@example.com</span></p>
            <p className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><PhoneCall size={"20px"} /><span>Phone: +1 (555) 123-4567</span> </p>
            <p className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><MapPinIcon size={"20px"} /><span>Address: 123 Tech St, City</span></p>
            <p className="text-sm text-gray-800 dark:text-gray-300 flex flex-row gap-3"><HeadphonesIcon size={"20px"} /><span>Support: 123 234 56 67</span></p>
          </div>

          {/* Third Part: Quick Links (Placeholder) */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <a href="#" className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Home</a>
            <a href="#" className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Services</a>
            <a href="#" className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">About</a>
            <a href="#" className="text-sm text-gray-800 dark:text-gray-300 hover:dark:text-white hover:text-slate-600">Blog</a>
          </div>

          {/* Fourth Part: Social Media (Placeholder) */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-foreground ">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-white">
                <svg className="h-6 w-6" /* Add Facebook SVG */ />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-white">
                <svg className="h-6 w-6" /* Add Twitter SVG */ />
              </a>
              <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-white">
                <svg className="h-6 w-6" /* Add Instagram SVG */ />
              </a>
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