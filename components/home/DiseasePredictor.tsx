export async function getAQIByCity(city: string) {
  const res = await fetch(
    `https://api.openaq.org/v2/latest?city=${city}&limit=1`,
    { headers: { "X-API-Key": process.env.OPENAQ_KEY! } }
  );
  return res.json();
}