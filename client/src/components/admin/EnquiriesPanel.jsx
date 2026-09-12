import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../../utils/adminApi";
export default function EnquiriesPanel() {
  const [page, setPage] = useState(1),
    [data, setData] = useState(null),
    [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setData(await adminRequest("/enquiries?page=" + page));
    } catch (err) {
      setError(err.message);
    }
  }, [page]);
  useEffect(() => {
    let active = true;
    adminRequest("/enquiries?page=" + page)
      .then((data) => {
        if (active) setData(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [page]);
  async function update(id, status) {
    try {
      await adminRequest("/enquiries/" + id, {
        method: "PATCH",
        body: { status },
      });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <section>
      <h2>Enquiry inbox</h2>
      {error && <p role="alert">{error}</p>}
      {data?.enquiries.map((item) => (
        <article className="admin-subcard" key={item._id}>
          <p className="page-eyebrow">
            {item.kind} / {new Date(item.createdAt).toLocaleDateString()}
          </p>
          <h3>{item.name}</h3>
          <a href={"mailto:" + item.email}>{item.email}</a>
          <p>{item.phone}</p>
          <p>
            {[item.topic, item.organisation, item.skills, item.availability]
              .filter(Boolean)
              .join(" / ")}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>{item.message}</p>
          <label>
            Status
            <select
              value={item.status}
              onChange={(e) => update(item._id, e.target.value)}
            >
              <option value="new">New</option>
              <option value="in-progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
          </label>
        </article>
      ))}
      {data && !data.enquiries.length && <p>No enquiries yet.</p>}
      <div className="resource-actions">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!data || page * 25 >= data.count}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
