import logo from "../assets/afrilogo.png";
import { Layers, BookOpen, Wallet, Inbox } from "lucide-react";
const tabIcons = { programmes: Layers, articles: BookOpen, revenue: Wallet, enquiries: Inbox };
import StoriesPanel from "../components/admin/StoriesPanel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminRequest } from "../utils/adminApi";
import { useProgrammes } from "../utils/useProgrammes";
import ProgrammeEditor from "../components/admin/ProgrammeEditor";
import RevenuePanel from "../components/admin/RevenuePanel";
import EnquiriesPanel from "../components/admin/EnquiriesPanel";
const blank = {
  title: "",
  slug: "",
  intro: "",
  description: "",
  image: "",
  published: false,
  order: 0,
  programs: [],
  videos: [],
  reports: [],
};
export default function AdminPage() {
  const [user, setUser] = useState(null),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [tab, setTab] = useState("programmes"),
    [categories, setCategories] = useState([]),
    [editing, setEditing] = useState(null);
  const { refresh } = useProgrammes();
  useEffect(() => {
    adminRequest("/me")
      .then(setUser)
      .catch((err) => {
        if (err.status !== 401)
          setError(
            "The admin service is unavailable. Check that the backend is running.",
          );
      })
      .finally(() => setLoading(false));
  }, []);
  async function load() {
    try {
      const data = await adminRequest("/programmes");
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    if (user)
      adminRequest("/programmes")
        .then((data) => setCategories(data.categories))
        .catch((err) => setError(err.message));
  }, [user]);
  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      setUser(
        await adminRequest("/login", {
          method: "POST",
          body: Object.fromEntries(new FormData(event.currentTarget)),
        }),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(category) {
    if (
      !window.confirm(
        "Delete " +
          category.title +
          " and its programmes? This removes them from the website.",
      )
    )
      return;
    try {
      await adminRequest("/programmes/" + category._id, {
        method: "DELETE",
        body: { __v: category.__v },
      });
      await load();
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }
  async function logout() {
    try {
      await adminRequest("/logout", { method: "POST", body: {} });
      setUser(null);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className={"admin-site" + (user ? " admin-authenticated" : "")}>
      {user && <aside className="admin-sidebar">
        <Link to="/" className="admin-brand"><img src={logo} alt="Africa-RII" /><span>Content studio</span></Link>
        <nav className="admin-tabs" aria-label="Admin sections">
          {Object.entries(tabIcons).map(([name, Icon]) => <button key={name} aria-pressed={tab === name} onClick={() => { setTab(name); setError(""); }}><Icon size={18} />{name}</button>)}
        </nav>
        <div className="admin-sidebar-footer"><p>Manage your community's stories and support.</p><Link to="/">View website</Link></div>
      </aside>}
      <header className="admin-header">
        <Link to="/">Africa-RII / Back to website</Link>
        {user && <button onClick={logout}>Sign out</button>}
      </header>
      <main className="admin-main">
        <div className="admin-title">
          <p className="page-eyebrow">Africa-RII / Content management</p>
          <h1>{user ? tab.charAt(0).toUpperCase() + tab.slice(1) : "Admin sign in"}</h1>
          <p>
            {user
              ? "Publish community stories, manage programmes and follow your support."
              : "Sign in to manage your website content and enquiries."}
          </p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : !user ? (
          <form className="site-form admin-login" onSubmit={login}>
            <h2>Welcome back</h2>
            <p>Use your administrator email and password.</p>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="button-primary" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </form>
        ) : (
          <>
            {tab === "programmes" &&
              (editing ? (
                <ProgrammeEditor
                  key={editing._id || "new"}
                  category={editing}
                  onCancel={() => setEditing(null)}
                  onSaved={async () => {
                    setEditing(null);
                    await load();
                    await refresh();
                  }}
                />
              ) : (
                <section>
                  <div className="resource-actions">
                    <h2>Programme categories</h2>
                    <button
                      className="button-primary"
                      onClick={() => setEditing(blank)}
                    >
                      Add category
                    </button>
                    <button className="button-outline" onClick={load}>
                      Refresh
                    </button>
                  </div>
                  <p>
                    Manage category cards, individual programmes, images,
                    YouTube videos and PDF reports.
                  </p>
                  {categories.map((category) => (
                    <article className="admin-category" key={category._id}>
                      <div>
                        <h3>{category.title}</h3>
                        <p>
                          {category.published ? "Published" : "Draft"} /{" "}
                          {category.programs.length} programmes
                        </p>
                        <Link to={"/programs/" + category.slug}>View page</Link>
                      </div>
                      <div className="resource-actions">
                        <button
                          className="button-outline"
                          onClick={() => setEditing(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="button-outline"
                          onClick={() => remove(category)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                  {!categories.length && (
                    <p>
                      No categories yet. Run the seed command to import the
                      existing website or add one here.
                    </p>
                  )}
                </section>
              ))}
            {tab === "articles" && <StoriesPanel />}
            {tab === "revenue" && <RevenuePanel />}
            {tab === "enquiries" && <EnquiriesPanel />}
          </>
        )}
        {error && (
          <p className="form-status is-error" role="alert">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
