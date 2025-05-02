const ContactUsPage = () => {
  return (
    <div className="bg-[url('https://img.freepik.com/free-vector/red-background-elegant-design_677411-4234.jpg?semt=ais_hybrid&w=740')] bg-cover bg-fixed">
      <div className="w-full bg-black/30 px-6 py-12">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-screen">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-6 text-red-500">Contact Us</h1>
            <p className="text-gray-300 mb-10">
              Got a question, suggestion, or just want to say hi? Fill out the
              form below or email us directly at support@cineflix.com
            </p>
          </div>

          <div className="w-1/2">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-6 py-2 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
