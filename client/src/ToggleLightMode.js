import React, { useEffect, useState } from "react";
import sunIcon from "./sun.svg";
import moonIcon from "./moon.svg";

const ToggleLightMode = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const btn = document.querySelector(".btn-toggle");
    const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      document.body.classList.add("light-theme");
      setTheme("light");
    } else if (currentTheme === "dark") {
      document.body.classList.add("dark-theme");
      setTheme("dark");
    }

    btn.addEventListener("click", function () {
      if (prefersLightScheme.matches) {
        document.body.classList.toggle("dark-theme");
        const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save the new theme in localStorage
      } else {
        document.body.classList.toggle("light-theme");
        const newTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save the new theme in localStorage
      }
    });
  }, []);

  const icon = theme === "light" ? moonIcon : sunIcon;

  return (
    <div className="btn-toggle" style={{ marginRight: "20px" }}>
      <img className="sun-moon" style={{ width: "25px", display: "flex" }} src={icon} alt="Toggle Light Mode" />
    </div>
  );
};

export default ToggleLightMode;
