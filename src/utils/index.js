export const makeCall = async (url, config) => {
  const req = await fetch(url, config);
  const resp = await req.json();

  return resp;
};

export const getData = async (url) => {
  const resp = await makeCall(url, { method: "GET" });

  return resp;
};

export const deleteData = async (url) => {
  const resp = await makeCall(url, { method: "DELETE" });

  return resp;
};

export const postData = async (url, body) => {
  const resp = await makeCall(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return resp;
};

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export const getCartCount = (cart) => cart.reduce((a, c) => a + c.qty, 0.0);

export const isCardValid = (cardNumber) => {
  //someMagic(cardNumber)
  console.log("Card Number--------->", cardNumber);
  return true;
};

// afterDays should be a number
export function getFutureDayAfter(afterDays) {
  const today = new Date();

  console.log("cardNumber ------>", afterDays, today);
  //   some magic
  const futureDay = "i.e ... afterdays from today";
  return futureDay;
}
