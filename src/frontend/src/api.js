export async function getForecastData(locationCode, date) {
  let url = `/api/forecast/${locationCode}/`;
  if (date) {
    url = `${url}?date=${date}`;
  }
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

export async function searchLocationByName(query) {
  const response = await fetch('/api/location/?name=' + query);
  const data = await response.json()
  return data;
}

export async function searchLocationByCode(code) {
  const response = await fetch('/api/location/?code=' + code);
  const data = await response.json()
  return data;
}
