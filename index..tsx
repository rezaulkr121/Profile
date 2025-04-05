import React, { useState } from "react";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [isBangla, setIsBangla] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setIsBangla(!isBangla);

  const t = (bn, en) => (isBangla ? bn : en);

  const sendToGoogleSheet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycby8NsVJjuCJ2XMexPVG-_LTUR46yCMUK5gzHuLuPgT8-cwVbKaQ9pHjuV2DNArQFkO6/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setSuccessMessage(t("বার্তা সফলভাবে পাঠানো হয়েছে!", "Message sent successfully!"));
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        alert("Failed to send message.");
      }

      e.target.reset();
    } catch (error) {
      alert("Error occurred.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen flex flex-col items-center justify-between p-4 transition-colors duration-500`}>
      <div className={`shadow-xl rounded-2xl p-8 max-w-md w-full text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={toggleDarkMode} checked={darkMode} />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
            <span className="text-sm">{darkMode ? t("ডার্ক মোড", "Dark Mode") : t("লাইট মোড", "Light Mode")}</span>
          </div>

          <button onClick={toggleLanguage} className="text-sm px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition">
            {isBangla ? "English" : "বাংলা"}
          </button>
        </div>

        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full mb-4 shadow-md animate-fadeIn"
        />
        <h1 className="text-2xl font-bold">{t("তোমার নাম", "Your Name")}</h1>
        <p className="mt-1">{t("ওয়েব ডেভেলপার | ডিজাইনার | প্রোগ্রামার", "Web Developer | Designer | Programmer")}</p>

        <div className="mt-4 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("আমার স্কিলস", "My Skills")}</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>HTML, CSS, JavaScript</li>
            <li>React, Tailwind CSS</li>
            <li>Git & GitHub</li>
            <li>Firebase, Node.js</li>
          </ul>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("প্রজেক্ট সমূহ", "Projects")}</h2>
          <ul className="space-y-1 text-blue-500">
            <li><a href="https://yourproject1.com" target="_blank" rel="noopener noreferrer">Portfolio Website</a></li>
            <li><a href="https://yourproject2.com" target="_blank" rel="noopener noreferrer">Todo App</a></li>
          </ul>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("অভিজ্ঞতা", "Experience")}</h2>
          <p>{t("৩ বছরের বেশি সময় ধরে ওয়েব ডেভেলপমেন্ট এবং ডিজাইন নিয়ে কাজ করছি।", "Over 3 years of experience in web development and design.")}</p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("শিক্ষাগত যোগ্যতা", "Education")}</h2>
          <p>{t("কম্পিউটার সায়েন্সে বিএসসি (XYZ বিশ্ববিদ্যালয়)", "BSc in Computer Science (XYZ University)")}</p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("টেস্টিমোনিয়াল", "Testimonials")}</h2>
          <blockquote className="italic text-sm border-l-4 border-blue-500 pl-4">
            {t("ও অসাধারণ একজন ডেভেলপার। কাজের প্রতি তার কমিটমেন্ট অসাধারণ।", "He is an amazing developer. Very committed to his work.")}
          </blockquote>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">{t("যোগাযোগ করুন", "Contact Me")}</h2>
          <form className="space-y-3" onSubmit={sendToGoogleSheet}>
            <input
              type="text"
              name="name"
              placeholder={t("আপনার নাম", "Your Name")}
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("আপনার ইমেইল", "Your Email")}
              className="w-full p-2 rounded border"
              required
            />
            <textarea
              name="message"
              placeholder={t("আপনার বার্তা", "Your Message")}
              className="w-full p-2 rounded border"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
            >
              {t("পাঠান", "Send")}
            </button>
          </form>
          {successMessage && (
            <div className="mt-3 p-2 bg-green-100 text-green-800 rounded-md text-sm animate-pulse">
              {successMessage}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <a
            href="https://wa.me/8801XXXXXXXXX"
            target="_blank"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
          <a
            href="https://t.me/yourtelegramid"
            target="_blank"
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Telegram
          </a>
          <a
            href="https://facebook.com/yourfacebookid"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Your Name. {t("সব অধিকার সংরক্ষিত।", "All rights reserved.")}
      </footer>
    </div>
  );
}
