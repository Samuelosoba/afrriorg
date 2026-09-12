import reportStories from "../data/reportStories.json";
import { useCallback, useEffect, useState } from "react";
import {
  categories as initialCategories,
  summerStories as initialStories,
} from "../data/content";
import { ProgrammeContext } from "./programmeContext";
async function getContent(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Content unavailable");
  return response.json();
}
export default function ProgrammeProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories),
    [stories, setStories] = useState([
      ...reportStories,
      ...initialStories.filter(
        (story) => !reportStories.some((report) => report.year === story.year),
      ),
    ]);
  const refresh = useCallback(
    () =>
      Promise.allSettled([
        getContent("/api/programmes").then((data) => {
          if (Array.isArray(data.categories)) setCategories(data.categories);
        }),
        getContent("/api/stories").then((data) => {
          if (Array.isArray(data.stories)) setStories(data.stories);
        }),
      ]),
    [],
  );
  useEffect(() => {
    let active = true;
    getContent("/api/programmes")
      .then((data) => {
        if (active && Array.isArray(data.categories))
          setCategories(data.categories);
      })
      .catch(() => {});
    getContent("/api/stories")
      .then((data) => {
        if (active && Array.isArray(data.stories)) setStories(data.stories);
      })
      .catch(() => {});
    const timer = setInterval(refresh, 60000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [refresh]);
  return (
    <ProgrammeContext.Provider value={{ categories, stories, refresh }}>
      {children}
    </ProgrammeContext.Provider>
  );
}
