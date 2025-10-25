"use client";
import React from "react";
import ProjectCard from "./projectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const projects = [
    {
      span: "FullStack Application",
      title: "React/Nodejs Email System",
      description: "A modern Email & Notification Templates built with React Tailwind with backend system using nodejs/expressjs.",
      image: "/project1.png",
      link: "https://bookspace.vercel.app",
      github: ""
    },
    {
      span: "Frontend Application",
      title: "TravelEase",
      description: "A travel website with dynamic destinations and Tailwind animations.",
      image: "/projects/travelease.png",
      link: "https://travelease.vercel.app",
      github: ""
    },
    {
      span: "FullStack Application",
      title: "Food Delivery App",
      description: "React + Django based food ordering app with live menu and order tracking.",
      image: "/projects/foodapp.png",
      link: "https://foodapp.vercel.app",
      github: "",
    },
  ];
  

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      id="projects"
      viewport={{ once: false, amount: 0.2 }}
      className="flex md:justify-center items-center flex-col px-4 scroll-mt-20 my-12"
    >
      <motion.p
        variants={titleVariants}
        transition={{ type: "spring", stiffness: 50 }}
        className="uppercase tracking-[0.25em] text-[#f5d77b] font-medium text-xl mb-6 text-center"
      >
        PROJECTS
      </motion.p>

      <motion.h1
        variants={containerVariants}
        className="text-center  text-3xl font-light leading-tight mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
      >
        <motion.span variants={titleVariants} className="inline-block">
          Discover
        </motion.span>
        <motion.span variants={titleVariants} className="inline-block">
          Amazing
        </motion.span>
        <motion.span
          variants={titleVariants}
          className="text-[#b88a17] inline-block"
        >
          FullStack Projects
        </motion.span>
      </motion.h1>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-center max-w-[1200px] gap-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full py-2"
          >
            <ProjectCard project ={ project }/>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
