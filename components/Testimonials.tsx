"use client";
import React from "react";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const testimonials = [
  {
    name: "Biswajit Panda",
    role: "Pre Final Year Student, Vssut Burla",
    quote:
      "Hack MNC literally became my daily coding companion. The company-wise DSA tracking helped me focus on the exact problems asked by Google and Amazon",
  },
  {
    name: "Prajnamayee Sahu",
    role: "B.Tech, 3rd Year",
    quote:
      "I used to waste time searching for ‘most asked questions by companies’ on random blogs. Hack MNC solved that — everything is structured, updated, and FREE! The progress tracker keeps me consistent.",
  },
  {
    name: "Dharmendra Mahanta",
    role: "Chief Enigma member",
    quote:
      "This platform feels like a premium LeetCode plan — but for free! I love how it shows problem frequency, acceptance rates, and topic coverage at a glance.",
  },

  {
    name: "Sonakshi Pradhan",
    role: "B.Tech, 3rd year",
    quote:
      "I don’t have access to paid LeetCode Premium, but Hack MNC gave me everything I needed — structured problems, and interview insights. Amazing initiative for students like me!",
  },
  {
    name: "Satyajeet Sahu",
    role: "200+ solved on leetcode",
    quote:
      "Hack MNC’s interface and tracking system made my DSA prep organized. It’s perfect for anyone who wants to cover all company-wise questions smartly, not randomly.",
  },

  {
    name: "Krishna Mundari",
    role: "B.tech, 3rd year",
    quote:
      "Even as a beginner, I found Hack MNC super easy to navigate. It’s like having your own coding mentor — guiding you company by company.",
  },
  {
    name: "Shivam Parihari",
    role: "Senior python developer",
    quote:
      "I never thought tracking LeetCode questions by topic and company could be so satisfying. Hack MNC turned my chaotic prep into a measurable journey.",
  },
  {
    name: "Chinmay sahu",
    role: "Senior IIC member",
    quote:
      "I recommend Hack MNC to all  students. It consolidates premium DSA content and company-wise problems beautifully. It’s a must-use resource for serious interview preparation.",
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">What our users say</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real stories from learners using hackmnc for interview prep
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <Card className="bg-card border border-border h-full">
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
