import React from "react";
import Mission from "../components/Mission";
import ChefCard from "../components/ChefCard";

import aboutImage from "../assets/images/about/our-story.jpg";
import chefArjun from "../assets/images/chefs/chef-arjun.jpg";
import chefPooja from "../assets/images/chefs/chef-pooja.jpg";
import chefVikram from "../assets/images/chefs/chef-vikram.jpg";

export default function About() {
  return (
    <main role="main" className="bg-white text-slate-800 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#f97316,_transparent_60%)]" />

        <div className="relative z-10 max-w-5xl text-center">
          <span className="inline-block mb-4 text-sm uppercase tracking-widest text-orange-500">
            Since 2015
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Crafting Stories <br className="hidden sm:block" />
            Through Southern Flavors
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Southern Tales is where heritage recipes, modern craftsmanship, and
            heartfelt hospitality come together to create unforgettable dining
            experiences.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <span className="text-sm uppercase tracking-widest text-orange-600 font-semibold">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-8 leading-snug">
              Rooted in Tradition, <br /> Refined for Today
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Southern Tales was born from a deep respect for Southern Indian
              culinary traditions and the belief that food is an emotional
              experience. Every recipe carries generations of wisdom, carefully
              adapted for the modern palate.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              From intimate family dinners to joyful celebrations, our tables
              are designed to feel welcoming, comforting, and memorable.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative group">
            <img
              src={aboutImage}
              alt="Our story at Southern Tales"
              loading="lazy"
              className="rounded-3xl shadow-2xl w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 backdrop-blur-md bg-white/90 px-6 py-4 rounded-2xl shadow-lg">
              <p className="font-semibold text-slate-800">
                Handcrafted • Authentic • Timeless
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "50+", label: "Signature Dishes" },
            { value: "10k+", label: "Happy Guests" },
            { value: "3", label: "Award-Winning Chefs" },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-orange-500 mb-2">
                {item.value}
              </p>
              <p className="text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHEFS */}
      <section className="bg-slate-100 py-28 px-6">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <span className="text-sm uppercase tracking-widest text-orange-600 font-semibold">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            The Minds Behind the Menu
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Led by seasoned culinary professionals, our kitchen blends
            innovation with deep-rooted traditions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <ChefCard
            image={chefArjun}
            name="Chef Arjun Mehta"
            role="Executive Chef"
            description="With over 18 years of experience, Chef Arjun leads the kitchen with a refined vision rooted in authentic Southern flavors."
          />

          <ChefCard
            image={chefPooja}
            name="Chef Pooja Nair"
            role="Pastry & Desserts"
            description="Chef Pooja brings balance and elegance to desserts, blending traditional Indian sweets with modern presentation."
          />

          <ChefCard
            image={chefVikram}
            name="Chef Vikram Singh"
            role="Head Chef"
            description="Renowned for his mastery of spices, Chef Vikram crafts bold, soulful dishes inspired by regional traditions."
          />
        </div>
      </section>

      {/* MISSION */}
      <Mission />

    </main>
  );
}
