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
