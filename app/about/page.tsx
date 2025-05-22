import AnimatedBackground from "components/animated-background";
import { Code, Globe, Server, Layers } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/router';

export default function About() {
  const skills = [
    { name: "HTML/CSS", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "React", level: 65 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Python", level: 60 },
    { name: "Django", level: 55 },
    { name: "API Integration", level: 60 },
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">About Me</h1>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
              <Image src="/images/profile-photo.png" alt="Khushi Hassan" fill className="object-cover" />
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 md:p-10 mb-16 backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">My Background</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Hello! I'm a passionate beginner full-stack developer with a strong desire to create beautiful and
                functional web applications. I started my coding journey recently and have been constantly learning and
                improving my skills.
              </p>
              <p>
                I come from [Hyderabad/Pakistan], where I developed an interest in technology and problem-solving. My
                background in [IT Hyderabad Gc univercity] has given me a unique
                perspective on approaching development challenges.
              </p>
              <p>
                Although I'm at the beginning of my development career, I'm committed to continuous learning and growth.
                I enjoy tackling new challenges and expanding my knowledge in web development.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 md:p-10 mb-16 backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-200">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 md:p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-200">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-700 p-4 rounded-full mb-4">
                  <Code className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Frontend Development</h3>
                <p className="text-gray-300">
                  Creating responsive and interactive user interfaces using HTML, CSS, JavaScript, and React.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-700 p-4 rounded-full mb-4">
                  <Server className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Backend Development</h3>
                <p className="text-gray-300">
                  Building server-side applications with Python and Django to handle data and business logic.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-700 p-4 rounded-full mb-4">
                  <Layers className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Full-Stack Integration</h3>
                <p className="text-gray-300">
                  Connecting frontend and backend systems to create complete, functional applications.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-700 p-4 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">API Integration</h3>
                <p className="text-gray-300">
                  Working with APIs to connect applications and services for enhanced functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
