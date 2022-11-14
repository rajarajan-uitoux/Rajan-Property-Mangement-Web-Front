import React, { useEffect, useState } from "react";
import { dayShortText, monthShortText } from "../../utils/constants";

export default function LiveDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "max-content",
        height: "max-content",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#F5F8FA",
        borderRadius: "8px",
        color: "#5F6478",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        letterSpacing: "0.001em",
      }}
    >
      {dayShortText[currentDateTime.getDay()]}, {currentDateTime.getDate()}{" "}
      {monthShortText[currentDateTime.getMonth()]}{" "}
      {currentDateTime
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace("pm", "PM")
        .replace("am", "AM")}
    </div>
  );
}
