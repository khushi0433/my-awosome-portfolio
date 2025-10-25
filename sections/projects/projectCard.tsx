"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ny } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";

type Project = {
  span: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

type ProjectCardProps = {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative p-4 z-10 w-full h-[510px] sm:max-w-96 rounded-lg border border-b-0
                 bg-card focus:rounded-full focus:outline-none focus:ring-[1.5px] focus:ring-transparent focus:ring-offset-blue-500
                  focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 border-zinc-300 dark:border-x-0 dark:border-b-0 dark:border-t-[1px]
                   dark:border-neutral-500/40 dark:bg-neutral-900 dark:bg-none dark:focus:ring-offset-blue-500
                    dark:focus-visible:ring-offset-blue-500 py-2"
    >
      <motion.div
        className="w-full rounded-lg overflow-hidden h-1/2 relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover w-full h-full absolute"
        />
      </motion.div>

      <div className="flex flex-col gap-3 pt-6">
        <span className="text-xs font-medium uppercase tracking-wider text-amber-500">
          {project.span}
        </span>

        <AuroraText className="text-2xl font-bold">{project.title}</AuroraText>

        <p className="text-zinc-300 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center gap-x-3 py-2 px-4 rounded-lg border
                     bg-stone-100 focus:rounded-full focus:outline-none focus:ring-[1.5px] focus:ring-transparent focus:ring-offset-blue-500
                      focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 dark:border-x-0 dark:border-b-0 dark:border-t-[1px]
                       dark:border-neutral-500/40 dark:bg-neutral-900 dark:bg-none dark:focus:ring-offset-blue-500
                        dark:focus-visible:ring-offset-blue-500"
          >
            Demo
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex items-center gap-x-3 py-2 px-4 rounded-lg border
                     bg-stone-100 focus:rounded-full focus:outline-none focus:ring-[1.5px] focus:ring-transparent focus:ring-offset-blue-500
                      focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 dark:border-x-0 dark:border-b-0 dark:border-t-[1px]
                       dark:border-neutral-500/40 dark:bg-neutral-900 dark:bg-none dark:focus:ring-offset-blue-500
                        dark:focus-visible:ring-offset-blue-500"
          >
            Code
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </div>
      </div>

      <motion.div
        animate={{ width: isHovered ? "128px" : "64px" }}
        transition={{ type: "spring", stiffness: 300 }}
        className={ny("absolute top-0 left-0 h-1 rounded-br-md bg-[#f0c75e]")}
      />
    </motion.div>
  );
};

export default ProjectCard;
