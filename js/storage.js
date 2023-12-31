const STORAGE_TOKEN = "ZRYL5VSRFXWGEMQ8T4PNPK6TU2G6YGF1KM0BSF4U";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * This function is sending a payload to the Backend
 * @param {string} key - JSON Key
 * @param {string} value - JSON Value
 * @returns promise
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * This function retrieves data from backend
 * @param {string} key - JSON key
 * @returns JSON
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Verbesserter code
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
