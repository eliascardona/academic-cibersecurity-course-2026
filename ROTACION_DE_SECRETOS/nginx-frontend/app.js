// The browser never holds the API key. nginx adds it server-side.
const createCustomerButton = document.getElementById('createCustomerButton');
const setCustomerId_Input = document.getElementById('setCustomerId_Input');
const setCustomerId_Button = document.getElementById('setCustomerId_Button');
const getCustomerButton = document.getElementById('getCustomerButton');
const statusEl = document.getElementById('status');
const outputEl = document.getElementById('output');
let customersCounter = 2;

async function performHTTPRequest(path = "/api", options = {}, finallyFunction = () => {}) {
  try {
    const res = await fetch(path, options);

    const body = await res.json().catch(() => ({}));

    if (res.ok) {
      statusEl.className = 'status ok';
      statusEl.textContent = `${res.status} OK`;
    } else {
      statusEl.className = 'status err';
      statusEl.textContent = `${res.status} ${res.statusText}`;
    }
    outputEl.textContent = JSON.stringify(body, null, 2);
  } catch (err) {
    statusEl.className = 'status err';
    statusEl.textContent = 'Request failed';
    outputEl.textContent = String(err);
  } finally {
    finallyFunction()
  }
}

createCustomerButton.addEventListener('click', async () => {
  createCustomerButton.disabled = true;
  statusEl.className = 'status';
  statusEl.textContent = 'Sending request...';
  outputEl.textContent = '—';
  customersCounter++;

  const payload = {
    name: `Usuario ${customersCounter}`
  }
  const requestBody = JSON.stringify(payload)

  console.log(`[payload]`, payload);
  console.log(`[Request body]`, requestBody);

  const createCustomerPath = "/api/customers"
  const createCustomerOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody
  };

  performHTTPRequest(
    createCustomerPath,
    createCustomerOptions,
    () => { createCustomerButton.disabled = false }
  );
});

let customerId

setCustomerId_Input.addEventListener('change', e => {
  customerId = e.target.value
  console.log(`[DOM Event | Input change] - ${e.target.id} - ${e.target.value}`);
})

getCustomerButton.addEventListener('click', async () => {
  getCustomerButton.disabled = true;
  statusEl.className = 'status';
  statusEl.textContent = 'Sending request...';
  outputEl.textContent = '—';

  const getCustomerPath = "/api/customers/1"
  const getCustomerOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  performHTTPRequest(
    getCustomerPath,
    getCustomerOptions,
    () => { getCustomerButton.disabled = false }
  );
});