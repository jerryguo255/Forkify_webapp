import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const pros = new Promise(async resolve => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      console.log('-----');
      if (!res.ok) throw new Error(`${data.message} (${res.status})..`);

      resolve(data);
    });
    const result = Promise.race([timeout(TIMEOUT_SEC), pros]).then(
      data => data
    );
    return result;
    // if (!res.ok) throw new Error(`${data.message}(${res.status})`);
  } catch (error) {
    console.error(error);
  }
};
