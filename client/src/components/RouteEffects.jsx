import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.documentElement.classList.toggle("inner-route", pathname !== "/");
    document.title =
      (document.querySelector("h1")?.textContent ||
        "Community-led opportunity") + " | Africa-RII";
    const frame = requestAnimationFrame(() => {
      if (hash)
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
