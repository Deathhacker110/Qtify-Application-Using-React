import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

let Faqs = () => {
  let [activeIndex, setActiveIndex] = useState(null);

  let toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  let faqData = [
    {
      question: "Is QTify free to use?",
      answer: "Yes, QTify is completely free to use with no hidden charges.",
    },
    {
      question: "Can I download and listen to songs offline?",
      answer:
        "Yes, QTify allows you to download songs and listen to them offline.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#000", padding: "20px",marginBottom:"100px" }}>
      <h1 style={{ textAlign: "center", color: "#34c94b", fontSize: "3rem" }}>
        FAQs
      </h1>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="faq-question"
            >
              {faq.question}
              <span style={{ color: "#34c94b" }}>
                {activeIndex === index ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </span>
            </button>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
