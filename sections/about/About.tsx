import Image from "next/image";
import { Mail, Linkedin, Instagram, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "tween", duration: 0.3 }}
  >
    <Card className="gap-2  p-4 border-b-0 border-gray-200 bg-stone-100 dark:border-neutral-500/40 dark:bg-neutral-900">
      <h3 className="text-amber-500 text-2xl font-medium">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </Card>
  </motion.div>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <motion.a
    whileHover={{ scale: 1.15, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 300 }}
    href={href}
    className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 border-b-0 bg-stone-100 dark:border-neutral-500/40 dark:bg-neutral-900 cursor-pointer"
  >
    {icon}
  </motion.a>
);

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween" as const,
        ease: "easeInOut" as const,
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
        mass: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      rotateZ: 2,
      boxShadow: "0px 20px 40px rgba(245, 215, 123, 0.2)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="about"
      className="flex justify-end items-center flex-col px-4 my-12"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-[1fr_1.5fr] gap-8"
        >
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-black to-zinc-900 shadow-xl  "
          >
            <Image
              src="/about.me.jpg"
              alt="Profile photo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-between"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-amber-500 text-3xl font-medium flex items-center gap-3"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-8 h-1 bg-amber-500 origin-left"
                />
                About me
              </motion.h2>

              <motion.div
                className="text-foreground"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {[
                  "I'm a passionate full-stack web developer based in Hyderabad, Pakistan My coding journey began back in 2023, and ever since, I’ve been fascinated by how technology can bring ideas to life. With a strong foundation in HTML, CSS, JavaScript, React, and nodejs, I love turning concepts into clean, functional, and creative web experiences. I’m currently deepening my skills in Ai Integration and startups or business management systems, also exploring how design and logic come together to create seamless digital products. Over time, I’ve built projects that solve real problems and helped me grow as both a designer and a developer. I’m always eager to collaborate, learn, and build something meaningful so feel free to explore my work below or reach out if you’d like to connect!",
                ].map((text, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className={`inline-block ${
                      index % 2 === 1
                        ? "text-muted-foreground font-medium mx-1"
                        : ""
                    }`}
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 my-8"
            >
              {[
                ["20+", "Projects Completed"],
                ["99%", "Client Satisfaction"],
                ["30%", "Conversion Rate Boost"],
                ["3+", "Years of Experience"],
              ].map(([value, label], index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatCard value={value} label={label} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
