import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { AboutConfig } from '../../types/about';

interface AboutLeadershipSectionProps {
  config: AboutConfig;
}

export const AboutLeadershipSection: React.FC<AboutLeadershipSectionProps> = ({ config }) => {
  const { leadership } = config;

  return (
    <section className="w-full bg-white text-zinc-900 py-20 sm:py-28 px-6 md:px-12 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between border-b border-zinc-200 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#F01B25]" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                {leadership.eyebrow}
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950 leading-[0.95]">
              {leadership.title}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 text-zinc-600 font-outfit text-sm sm:text-base leading-relaxed lg:pl-10"
          >
            {leadership.subtitle}
          </motion.div>
        </div>

        {/* 4 Leadership Cards in a Grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {leadership.members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col space-y-4"
            >
              {/* Image Container with Grayscale Editorial treatment */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 group-hover:border-[#F01B25] transition-all duration-500 shadow-sm group-hover:shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[11px] font-mono-tech text-white uppercase tracking-wider">
                    {member.division}
                  </span>
                </div>
              </div>

              {/* Leader Info */}
              <div className="space-y-1">
                <h4 className="text-xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950 group-hover:text-[#F01B25] transition-colors">
                  {member.name}
                </h4>
                <div className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-wide uppercase">
                  {member.role}
                </div>
                {member.bio && (
                  <p className="text-xs font-outfit text-zinc-600 leading-relaxed pt-1 line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* OUR PEOPLE Sub-section matching reference image bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-zinc-200 space-y-6"
        >
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#F01B25]" />
              <span className="text-xs font-mono-tech font-bold text-[#F01B25] tracking-widest uppercase">
                {leadership.people.eyebrow}
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-grotesk font-extrabold uppercase tracking-tight text-zinc-950">
              {leadership.people.title}
            </h4>
            <p className="text-sm sm:text-base font-outfit text-zinc-600 leading-relaxed font-normal">
              {leadership.people.description}
            </p>
          </div>

          {/* Department Pills / Tags matching reference */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
            {leadership.people.departments.map((dept, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-mono-tech font-semibold uppercase tracking-wider hover:border-[#F01B25] hover:text-[#F01B25] hover:bg-red-50/50 transition-all cursor-default"
              >
                {dept}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
