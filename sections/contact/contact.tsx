"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Github } from "lucide-react";
import { toast } from "sonner";
import { AnimatedSubmitButton } from "@/components/ui/animated-submit-button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(8, { message: "Subject must be at least 10 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");

  const headerRef = useRef(null);
  const bioRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const bioInView = useInView(bioRef, { once: true, amount: 0.3 });
  const contactInfoInView = useInView(contactInfoRef, {
    once: true,
    amount: 0.3,
  });
  const formInView = useInView(formRef, { once: true, amount: 0.1 });
  const socialInView = useInView(socialRef, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setIsSubmitting("success");
      toast("Thank you for your message. We'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast("Your message couldn't be sent. Please try again.");
      setIsSubmitting("error");
    } finally {
      setTimeout(() => setIsSubmitting("idle"), 2000);
    }
  };

  return (
    <div
      id="contact"
      className="container mx-auto px-4 py-12 md:py-24 max-w-7xl scroll-mt-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <motion.div
            ref={headerRef}
            variants={containerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold text-white">
              Khushbu_Baloch
            </h1>
            <h2 className="text-3xl text-white">Software Developer</h2>
          </motion.div>

          <motion.div
            ref={bioRef}
            variants={containerVariants}
            initial="hidden"
            animate={bioInView ? "visible" : "hidden"}
            className="border-t border-border pt-3"
          >
            <p className="text-white mt-3">
              Connect_With_Me
            </p>
          </motion.div>

          <motion.div
            ref={contactInfoRef}
            variants={containerVariants}
            initial="hidden"
            animate={contactInfoInView ? "visible" : "hidden"}
            className="space-y-2"
          >
            <div>
              <h3 className="text-sm text-white/70">E-mail</h3>
              <p className="font-medium text-white">khushbubaloch01@gmail.com</p>
            </div>

            <div>
              <h3 className="text-sm text-white/70">Phone</h3>
              <p className="font-medium text-white">+92 3021884972</p>
            </div>
          </motion.div>

          <motion.div
            ref={socialRef}
            variants={containerVariants}
            initial="hidden"
            animate={socialInView ? "visible" : "hidden"}
            className="flex gap-4"
          >
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#012E40] cursor-pointer hover:bg-white/10 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Linkedin</span>
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#012E40] cursor-pointer hover:bg-white/10 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Github</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={formRef}
          variants={containerVariants}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isSubmitting === "loading"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          {...field}
                          disabled={isSubmitting === "loading"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Message Subject"
                        {...field}
                        disabled={isSubmitting === "loading"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here"
                        rows={8}
                        {...field}
                        disabled={isSubmitting === "loading"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {AnimatedSubmitButton({
                status: isSubmitting,
                type: "submit",
                className:
                  "w-full group flex items-center justify-center gap-x-3 py-6 px-4 rounded-lg border bg-black text-white focus:rounded-full focus:outline-none focus:ring-[1.5px] focus:ring-transparent focus:ring-offset-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 border-white/20 hover:bg-white hover:text-black transition-colors",
                disabled: isSubmitting === "loading",
              })}
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
