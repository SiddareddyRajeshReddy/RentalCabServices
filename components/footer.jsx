import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "Cars", href: "#" },
    { label: "Our Partner", href: "#" },
  ];

  const serviceLinks = [
    { label: "Instant Rent", href: "#" },
    { label: "Private Driver", href: "#" },
    { label: "Long Trip", href: "#" },
  ];

  const supportLinks = [
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Call Center", href: "#" },
    { label: "Partner With Us", href: "#" },
    { label: "Terms & Condition", href: "#" },
  ];

  const socialIcons = [
    { src: "./insta.png", alt: "Instagram" },
    { src: "./fb.png", alt: "Facebook" },
    { src: "./twitter.png", alt: "Twitter" },
    { src: "./linkedln.png", alt: "LinkedIn" },
  ];

  return (
    <footer className="text-white w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {/* Brand Info */}
          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4 text-[#f55f5f]">RCs</h2>
            <p className="text-[#AEA6A6] mb-6 leading-relaxed">
              We are a well-known car rental service that has many partners in each region to connect with you to assist in your trip in meetings, events, holidays or long trips.
            </p>
            
            <div className="flex justify-start items-center gap-4">
              {socialIcons.map((icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  aria-label={icon.alt}
                  className="transition-opacity hover:opacity-80"
                >
                  <img 
                    src={icon.src} 
                    alt={icon.alt} 
                    className="h-6 w-6 object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#807878]">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[#AEA6A6] hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#807878]">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[#AEA6A6] hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#807878]">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[#AEA6A6] hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-[#f55f5f] py-3 mt-8 text-center text-white">
        <p className="text-sm md:text-base">
          © {currentYear} GRENN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;