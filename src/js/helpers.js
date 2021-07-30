import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

//set a timmer promise, when timeout, reject promise with error
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Timeout after ${s} seconds.\n Request took too long. <br>   Please try again 😥`
        )
      );
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//https://forkify-api.herokuapp.com/api/v2/recipes/:id

//get Json data
export const getJson = async function (url) {
  try {
    // two steps wrap in a promise,
    const getJsonPromise = new Promise(async (resolve, reject) => {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok)
        reject(
          new Error(
            ` Cannot fetch data from thrid party service please Try again. <br><br>${data.message} (${res.status})`
          )
        );

      resolve(data);
    });

    //race two promise
    return await Promise.race([timeout(TIMEOUT_SEC), getJsonPromise]);
  } catch (err) {
    throw err;
  }
};

export const postJson = async function (url, jsonData) {
  try {
    const data = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const res = await Promise.race([timeout(TIMEOUT_SEC), data]);
    const resData = await res.json();
    if (!res.ok)
      throw new Error(`🐞 ${res.status} ${res.statusText}--${resData.message}`);

    return resData;
  } catch (err) {
    throw err;
  }
};
