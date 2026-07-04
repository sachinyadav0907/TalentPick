import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Help() {
  const supportCards = [
    {
      title: "Account Issues",
      description:
        "Facing problems with login, registration, or password reset? Make sure your email and password are correct or contact support.",
    },
    {
      title: "Job Applications",
      description:
        "Track your job applications directly from your dashboard. Recruiters can also manage applicants efficiently.",
    },
    {
      title: "Recruiter Support",
      description:
        "Recruiters can post jobs, manage listings, and shortlist candidates from the recruiter dashboard.",
    },
    {
      title: "Contact Us",
      description: "Email: ysachin8600@gmail.com\nPhone: +91 8369474170",
    },
  ];

  const faqs = [
    {
      question: "How do I apply for jobs?",
      answer:
        "Create an account, login as a job seeker, and apply directly from job listings.",
    },
    {
      question: "How can recruiters post jobs?",
      answer:
        "Register as a recruiter and access the recruiter dashboard to create and manage job listings.",
    },
    {
      question: "Can I Change my role?",
      answer:
        "No, You can not change your role as for security reasons.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
              Help & Support
            </h1>

            <p className="text-slate-400 mt-4 text-md">
              Need assistance? Find answers to common questions and support
              resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {supportCards.map((card, index) => (
              <div
                key={index}
                className="bg-slate-800/70 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-slate-100 mb-3">
                  {card.title}
                </h2>

                <p className="text-slate-400 whitespace-pre-line leading-relaxed text-md">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-800/40 border border-violet-500/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-violet-400 mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 pb-4 last:border-none"
                >
                  <h3 className="text-lg font-semibold text-slate-100">
                    {faq.question}
                  </h3>

                  <p className="text-slate-400 mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Help;
