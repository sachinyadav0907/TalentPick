import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function TechUsed() {
  const sections = [
    {
      title: "Frontend Development",
      technologies: [
        {
          name: "React",
          description:
            "Used to build reusable UI components and provide a smooth single-page application experience.",
        },
        {
          name: "Tailwind CSS",
          description:
            "Used for responsive layouts, consistent design, and rapid UI development.",
        },
        {
          name: "React Hook Form",
          description:
            "Used for efficient form state management and validation.",
        },
        {
          name: "Zod",
          description:
            "Used to validate user input on the client side.",
        },
        {
          name: "Axios",
          description:
            "Used for communication between frontend and backend APIs.",
        },
      ],
    },

    {
      title: "Backend Development",
      technologies: [
        {
          name: "Node.js",
          description:
            "Provides the runtime environment for server-side JavaScript.",
        },
        {
          name: "Express.js",
          description:
            "Used to build RESTful APIs and handle routing.",
        },
        {
          name: "JWT Authentication",
          description:
            "Used for secure user authentication and authorization.",
        },
      ],
    },

    {
      title: "Database",
      technologies: [
        {
          name: "MongoDB",
          description:
            "Stores application data including users, jobs, and applications.",
        },
        {
          name: "Mongoose",
          description:
            "Provides schema validation and database interaction.",
        },
      ],
    },

    {
      title: "Cloud Services",
      technologies: [
        {
          name: "Cloudinary",
          description:
            "Used for storing profile images and resume files.",
        },
      ],
    },

    {
      title: "Deployment",
      technologies: [
        {
          name: "Vercel",
          description:
            "Hosts and deploys the frontend application.",
        },
        {
          name: "Render",
          description:
            "Hosts backend APIs and server infrastructure.",
        },
        {
          name: "MongoDB Atlas",
          description:
            "Managed cloud database solution for MongoDB.",
        },
      ],
    },
  ];

  return (
    <div>
    <Navbar/>
    <main className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Technology Used
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto">
            This Job Portal project is built using modern web
            technologies that ensure scalability, performance,
            security, and a seamless user experience.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                {section.title}
              </h2>

              <div className="space-y-5">
                {section.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <h3 className="text-lg font-medium text-white">
                      {tech.name}
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer/>
    </div>
  );
}


export default TechUsed
