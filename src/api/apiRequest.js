import axios from 'axios';
import { useState, useEffect } from 'react';
import { oAuthURL, baseURL, clientID, clientSecret } from './apiKeys';

export async function getToken() {
  try {
    const { data: response } = await axios.post(oAuthURL, {
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });
    const token = response.access_token;
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  const data = 'fields screenshots.*,genres.*,name; limit 30;';
  let products = [];
  getToken().then(token => {
    const config = {
      method: 'post',
      url: 'https://noroffcors.herokuapp.com/' + baseURL + '/games',
      headers: {
        'Client-ID': clientID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      data: data,
    };
    axios(config).then(function (results) {
      products = results.data;
      return results.data;
    });
  });
}
