import { useProgrammes } from "./utils/useProgrammes";
import ProgrammeProvider from "./context/ProgrammeProvider";
import { lazy, Suspense } from "react";
const AdminPage = lazy(() => import("./Pages/AdminPage"));
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import ProgramsPage from "./Pages/ProgramsPage";
import CategoryPage from "./Pages/CategoryPage";
import ProgramPage from "./Pages/ProgramPage";
import SummerStoryPage from "./Pages/SummerStoryPage";
import AboutPage from "./Pages/About";
import ImpactPage from "./Pages/ImpactPage";
import GetInvolvedPage from "./Pages/GetInvolvedPage";
import StoriesPage from "./Pages/StoriesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ContactPage from "./Pages/ContactPage";
import DonatePage from "./Pages/DonatePage";
import VolunteerPage from "./Pages/VolunteerPage";
import PartnerPage from "./Pages/PartnerPage";
import RouteEffects from "./components/RouteEffects";
import { programUrl, summerSchoolUrl } from "./data/content";

function AppRoutes() {
  const { categories } = useProgrammes();
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<p>Loading dashboard...</p>}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<Navigate to="/about#team" replace />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:categorySlug" element={<CategoryPage />} />
        <Route
          path="/programs/:categorySlug/:programSlug"
          element={<ProgramPage />}
        />
        <Route
          path="/programs/education/summer-school/:year"
          element={<SummerStoryPage />}
        />
        {categories.flatMap((c) =>
          c.programs
            .filter(
              (p) =>
                !categories.some((cat) => cat.slug === p.slug) &&
                categories
                  .flatMap((cat) => cat.programs)
                  .filter((item) => item.slug === p.slug).length === 1,
            )
            .map((p) => (
              <Route
                key={p.slug}
                path={"/programs/" + p.slug}
                element={<Navigate to={programUrl(c, p)} replace />}
              />
            )),
        )}
        <Route path="/stories" element={<StoriesPage />} />
        <Route
          path="/stories/summer-school-2024"
          element={<Navigate to={summerSchoolUrl + "/2024"} replace />}
        />
        <Route
          path="/stories/summer-school-2025"
          element={<Navigate to={summerSchoolUrl + "/2025"} replace />}
        />
        <Route
          path="/stories/summer-school-2026"
          element={<Navigate to={summerSchoolUrl + "/2026"} replace />}
        />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ProgrammeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProgrammeProvider>
  );
}
