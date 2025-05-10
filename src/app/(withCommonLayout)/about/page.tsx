const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[url('https://img.freepik.com/premium-photo/many-rows-red-seats-cinema_161149-2461.jpg?semt=ais_hybrid&w=740')] bg-cover bg-fixed">
      <div className="w-full bg-black/30 px-6 py-12">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">
            About FilmNest
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Welcome to{" "}
            <span className="font-semibold text-white">FilmNest</span> — your
            ultimate destination for discovering, reviewing, and streaming your
            favorite movies and TV series.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              🎯 Our Mission
            </h2>
            <p className="text-gray-300">
              To connect viewers through authentic reviews, seamless streaming,
              and a community-driven platform that celebrates the power of
              storytelling.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              🚀 What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Explore the Library</strong>: Browse a growing
                collection of movies and series, filtered by genre, platform,
                year, and more.
              </li>
              <li>
                <strong>Review & Rate</strong>: Share your opinion with ratings,
                in-depth reviews, and spoiler tags.
              </li>
              <li>
                <strong>Interact</strong>: Like, comment, and join discussions
                with fellow users.
              </li>
              <li>
                <strong>Buy or Rent</strong>: Securely access premium content
                with our integrated payment system.
              </li>
              <li>
                <strong>Personal Dashboard</strong>: Track your watchlist,
                purchase history, and contributions.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              👥 Who We Are
            </h2>
            <p className="text-gray-300">
              FilmNest is powered by a team of developers, designers, and movie
              lovers committed to delivering a modern, user-centric experience.
              With a passion for cinema and cutting-edge tech, we&apos;ve
              created a space that’s intuitive, secure, and interactive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              🔐 Our Values
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>Transparency</strong>: Every review counts, and every
                opinion is respected.
              </li>
              <li>
                <strong>Community First</strong>: Our moderation ensures
                respectful and constructive interaction.
              </li>
              <li>
                <strong>Innovation</strong>: FilmNest evolves based on your
                feedback and changing trends.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              📬 Get in Touch
            </h2>
            <p className="text-gray-300">
              Have questions, feedback, or suggestions? Contact us via our{" "}
              <a href="/contact" className="text-red-500 underline">
                Contact Page
              </a>{" "}
              or email us at{" "}
              <a
                href="mailto:support@FilmNest.com"
                className="text-red-500 underline"
              >
                support@FilmNest.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
