import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/manaspros/", icon: <FaGithub /> },
  { href: "https://www.linkedin.com/in/-manas-choudhary-/", icon: <FaLinkedin /> },
  { href: "https://www.instagram.com/the_never_ending_guy/", icon: <FaInstagram /> },
  { href: "mailto:manas24102@iiitnr.edu.in", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Manas Choudhary 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#about"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
