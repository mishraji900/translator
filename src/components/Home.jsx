import React, { useState } from 'react'
import Navbar from './Navbar'

import axios from "axios";
const Home = () => {
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "ar", name: "Arabic" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "tr", name: "Turkish" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
    { code: "sv", name: "Swedish" },
    { code: "no", name: "Norwegian" },
  ];

  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("en");
  const [qText, setQText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = () => {
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "b10e974879mshb7dd5c8aa5ff2d0p158bedjsn739fbe13aead",
        "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
      },
      data: {
        from: fromLanguage,
        to: toLanguage,
        q: qText,
      },
    };

    axios.request(options).then((response) => {
      setTranslation(response.data);
      console.log(response.data)
    })
      .catch((error) => {
        console.error(error);
        setTranslation("Translation Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className='bg-[#03131a] min-h-[100vh] flex justify-center items-center flex-col gap-10'>
      <Navbar/>
      <div className='flex gap-10'>
        <div className='flex items-center'>
          <label htmlFor="from" className='text-white font-mono '>From:</label>
          <select
            id="from"
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className='bg-[#d4ff9d] font-akaya text-center pt-2 rounded-full font-bold'
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center'>
          <label htmlFor="to" className='text-white font-mono '>To:</label>
          <select
            id="to"
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className='bg-[#d4ff9d] font-akaya text-center pt-2 rounded-full font-bold'
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex lg:flex-row lg:gap-5 flex-col items-center justify-center'>

        <textarea
          id="qText"
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          rows="4"
          cols="60"
          className='rounded-2xl lg:mb-0 mb-5 p-3 text-lg'
          placeholder='Write text to translate'
        ></textarea>



        <textarea
          value={translation}
          readOnly
          rows="4"
          cols="60"
          className='rounded-2xl p-3 text-lg'
          placeholder='Translated Text'
        ></textarea>

      </div>
      <button onClick={handleTranslate} disabled={loading} className='bg-[#d4ff9d] px-5 pt-5 pb-2 rounded-full font-akaya font-bold'>
        Translate
      </button>
    </div>
  )
}

export default Home
