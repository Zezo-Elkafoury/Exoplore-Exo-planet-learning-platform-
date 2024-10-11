import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Obay Rashad',
    linkedin: 'https://www.linkedin.com/in/obay-dev',
    role: 'Lead Developer',
    description: 'Obay created the user interface, brought this website to life, and led the team in producing this excellent work.',
    image: '/team/obay.jpg'
  },
  {
    name: 'Ziad Elkafoury',
    linkedin:' https://www.linkedin.com/in/ziad-elkafoury',
    role: 'Data Scientist & Backend Developer',
    description: 'Ziad handled all data-related tasks, including data gathering, processing, and visualization. He also created the backend for the "Imagine a Planet" tool.', 
    image:'/team/ziad.jpeg'
  },
    {
    name: 'Ahmed Hossam',
    linkedin: 'https://www.linkedin.com/in/ahmed-hossam-42255027a/',
    role: 'Content Writer',
    description: "Some of the website's content was written by Ahmed.",
    image: '/'
  },
];



const PersonCard = ({ name, linkedin, role, description, image }) => (
  <motion.div
    className="relative p-6 rounded-lg bg-gray-800 shadow-lg"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        className="relative z-10 text-white text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 relative w-32 h-32 mx-auto rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm mt-1 text-purple-300">{role}</p>
        <p className="text-sm mt-3 text-gray-300">{description}</p>
      </motion.div>
    </Link>
  </motion.div>
);

const Section = ({ title, people }) => (
  <div className="mb-16">
    <motion.h2
      className="text-4xl font-bold mb-8 text-center text-white"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {people.map((person, index) => (
        <PersonCard key={index} {...person} />
      ))}
    </motion.div>
  </div>
);

const CreditsSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-stars" />
          <div className="relative z-10">
            <Section title="Who is behind this ?" people={teamMembers} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditsSection;