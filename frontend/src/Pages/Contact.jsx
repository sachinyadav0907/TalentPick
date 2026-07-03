import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../api/axiox.js";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Please enter a valid email address"),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot exceed 100 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export default function ContactUs() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await api.post("/feedback/store",data)
      reset();
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message||"Something went wrong");
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-slate-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from
              you. Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Get In Touch
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-slate-500 text-sm">Email</p>
                  <p className="text-white">ysachin8600@example.com</p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">Phone</p>
                  <p className="text-white">+91 8369474170</p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">Response Time</p>
                  <p className="text-white">Usually within 24 hours</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-slate-400 text-sm">
                  Your feedback helps improve the platform and create a better
                  experience for job seekers and recruiters.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">
                Send Feedback
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2">Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Subject</label>

                  <input
                    type="text"
                    placeholder="Enter subject"
                    {...register("subject")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                  />

                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.subject?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Message</label>

                  <textarea
                    rows={6}
                    placeholder="Write your feedback, suggestions, or questions..."
                    {...register("message")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white resize-none outline-none focus:border-blue-500"
                  />

                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.message?.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition"
                >
                  {isSubmitting ? "Submitting..." : "Send Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
