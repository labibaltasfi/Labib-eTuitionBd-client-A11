import React from 'react';

const About = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cyan-50 via-emerald-50 to-amber-50 py-16 sm:py-20">
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-10 -right-20 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-200 backdrop-blur">
            Connecting Learners & Teachers Across Bangladesh
          </span>
          <h1 className="mt-5 text-4xl font-extrabold text-slate-800 sm:text-5xl">
            About eTuitionBD
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            eTuitionBD is a colorful, modern tuition platform where students and
            tutors meet, connect, and move forward together through a simple and
            trusted experience.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-white/70 backdrop-blur sm:p-8">
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Why We Built This Platform
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Finding quality tuition should not be stressful. eTuitionBD helps
              students post requirements quickly and allows tutors to discover
              genuine opportunities in minutes.
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              From applying to managing ongoing tuition and payment tracking, the
              entire process lives in one secure dashboard.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-cyan-100 p-4 text-center">
                <p className="text-2xl font-extrabold text-cyan-700">Fast</p>
                <p className="text-sm text-cyan-900">Quick tutor matching</p>
              </div>
              <div className="rounded-2xl bg-emerald-100 p-4 text-center">
                <p className="text-2xl font-extrabold text-emerald-700">Safe</p>
                <p className="text-sm text-emerald-900">Secure accounts</p>
              </div>
              <div className="rounded-2xl bg-amber-100 p-4 text-center">
                <p className="text-2xl font-extrabold text-amber-700">Clear</p>
                <p className="text-sm text-amber-900">Transparent process</p>
              </div>
              <div className="rounded-2xl bg-rose-100 p-4 text-center">
                <p className="text-2xl font-extrabold text-rose-700">Smart</p>
                <p className="text-sm text-rose-900">Role-based workflow</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <article className="rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 p-px shadow-lg">
              <div className="rounded-3xl bg-white p-6">
                <h3 className="text-lg font-bold text-slate-800">For Students</h3>
                <p className="mt-2 text-slate-600">
                  Post tuition needs, compare applications, and choose the best
                  tutor confidently.
                </p>
              </div>
            </article>

            <article className="rounded-3xl bg-linear-to-r from-emerald-500 to-lime-500 p-px shadow-lg">
              <div className="rounded-3xl bg-white p-6">
                <h3 className="text-lg font-bold text-slate-800">For Tutors</h3>
                <p className="mt-2 text-slate-600">
                  Browse verified tuition posts, apply quickly, and build a
                  sustainable teaching journey.
                </p>
              </div>
            </article>

            <article className="rounded-3xl bg-linear-to-r from-fuchsia-500 to-rose-500 p-px shadow-lg">
              <div className="rounded-3xl bg-white p-6">
                <h3 className="text-lg font-bold text-slate-800">Trusted System</h3>
                <p className="mt-2 text-slate-600">
                  Reliable authentication, clean dashboards, and smooth progress
                  from application to payment.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-slate-900 px-6 py-10 text-center text-white shadow-2xl sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Mission</h2>
          <p className="mx-auto mt-4 max-w-4xl leading-relaxed text-slate-200">
            We are on a mission to make tuition easier, safer, and more
            transparent for every student and tutor by building a platform that
            values trust, speed, and real educational impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
