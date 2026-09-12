import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../../utils/adminApi";
export default function RevenuePanel() {
  const [mode, setMode] = useState("live"),
    [page, setPage] = useState(1),
    [data, setData] = useState(null),
    [error, setError] = useState("");
  const load = useCallback(async () => {
    setError("");
    try {
      setData(await adminRequest("/revenue?mode=" + mode + "&page=" + page));
    } catch (err) {
      setError(err.message);
    }
  }, [mode, page]);
  useEffect(() => {
    let active = true;
    adminRequest("/revenue?mode=" + mode + "&page=" + page)
      .then((data) => {
        if (active) setData(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [mode, page]);
  async function reconcile(reference) {
    try {
      await adminRequest("/donations/" + reference + "/reconcile", {
        method: "POST",
        body: {},
      });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <section>
      <h2>Donation revenue</h2>
      <p>
        Gross verified donations, grouped by currency. Test payments are
        separate. These totals are not a bank settlement or refund ledger.
      </p>
      <label>
        Payment mode{" "}
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setPage(1);
            setData(null);
          }}
        >
          <option value="live">Live payments</option>
          <option value="test">Test payments</option>
        </select>
      </label>
      <button className="button-outline" onClick={load}>
        Refresh
      </button>
      {error && <p role="alert">{error}</p>}
      {data && (
        <>
          <div className="editorial-grid">
            {data.totals.map((total) => (
              <div className="admin-subcard" key={total._id}>
                <h3>
                  {total._id} {(total.amount / 100).toLocaleString()}
                </h3>
                <p>{total.count} verified donations</p>
                <p>
                  Reported fees: {total._id}{" "}
                  {(total.fees / 100).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          {!data.totals.length && <p>No verified {mode} donations yet.</p>}
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date / reference</th>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.donations.map((d) => (
                  <tr key={d._id}>
                    <td>
                      {new Date(d.createdAt).toLocaleDateString()}
                      <small>{d.reference}</small>
                    </td>
                    <td>
                      {d.name}
                      <small>{d.email}</small>
                    </td>
                    <td>
                      {d.currency} {(d.amount / 100).toLocaleString()}
                    </td>
                    <td>{d.status}</td>
                    <td>
                      {d.status !== "success" && (
                        <button
                          className="button-outline"
                          onClick={() => reconcile(d.reference)}
                        >
                          Check Paystack
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="resource-actions">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
            <span>Page {page}</span>
            <button
              disabled={page * 25 >= data.count}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
