import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: "What industries does ProDynamics specialize in?",
    answer: "We offer comprehensive HR solutions across a wide range of industries including Tech & SaaS, Financial Services, Healthcare, Logistics, and Professional Services. Our advisors adapt recruitment and compliance frameworks specifically to your sector's regulatory standards."
  },
  {
    id: 2,
    question: "How does your pricing model or recruitment fee structure work?",
    answer: "Our consulting services are structured based on project scope or monthly retainers. For recruitment, we offer contingency-based pricing (a percentage of the candidate's first-year salary) or retained search structures for C-suite and executive leadership appointments."
  },
  {
    id: 3,
    question: "What is the typical timeline to place a qualified candidate?",
    answer: "Standard staff positions are typically sourced, vetted, and presented to your team within 10 to 15 business days. Executive or niche technical searches can take between 4 to 8 weeks to finalize, ensuring we recruit candidates of the highest standard."
  },
  {
    id: 4,
    question: "Can you audit and update our existing employee handbook and compliance guidelines?",
    answer: "Yes. We perform thorough audits of your current policies, employee contracts, and handbooks to ensure compliance with the latest local and national labor codes, adjusting them to reflect modern workplace policies like hybrid-work arrangements."
  },
  {
    id: 5,
    question: "Do you offer ongoing payroll and benefits administration support?",
    answer: "Absolutely. We partner with companies to manage day-to-day payroll processing, benefits enrollment, tax filings, and onboarding administration, freeing up your internal leaders to focus on core operations."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Find answers to common questions about our human resources consultation services, recruiting timelines, and compliance audits.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-100 rounded-sm overflow-hidden transition-all duration-300 shadow-xs hover:border-slate-200"
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-base sm:text-lg">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
