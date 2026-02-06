import React from "react";

const Mission = () => {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-orange-600 font-semibold mb-3">
            Our Purpose
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Mission & Values
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Southern Tales is built on authenticity, flavor, and heartfelt
            hospitality. Every dish tells a story—crafted with fresh ingredients,
            traditional techniques, and a deep respect for Southern culture.
          </p>

          <ul className="space-y-3 text-slate-700 text-lg">
            <li>• Fresh & premium ingredients</li>
            <li>• Authentic Southern flavors</li>
            <li>• Warm, welcoming hospitality</li>
            <li>• Sustainability & community focus</li>
          </ul>
        </div>

        {/* Accent Card */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border">
          <h4 className="text-xl font-semibold text-slate-900 mb-4">
            What Drives Us
          </h4>
          <p className="text-slate-600 leading-relaxed">
            We believe food brings people together. Our goal is to create a place
            where guests feel at home, traditions are honored, and every meal is
            memorable.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Mission;
