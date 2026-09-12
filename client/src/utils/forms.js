export async function submitJson(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25000),
  });
  const data = await response.json().catch(() => {
    throw new Error(
      "This service is unavailable. Please email hello@africarii.org.",
    );
  });
  if (!response.ok)
    throw new Error(
      data.error || "Unable to complete your request. Please try again.",
    );
  return data;
}
