import Express from 'express';
import fetch from 'node-fetch';

const app = Express();

//  Gbg 'https://www.yr.no/api/v0/locations/2-2711537/forecast/currenthour'
//  Sol 'https://www.yr.no/api/v0/locations/2-2675418/forecast/currenthour'
// const locations = ['2-2711537', '2-2675418'];

app.get('/yr/today', async (req, res) => {
  const loc = req.query['loc'];

  if (!loc) {
    res.status(404);
    res.send('Not found m8');

    return;
  }

  const data = await getWeatherTdy(loc);

  if (!data) {
    res.status(400).send();

    return;
  }

  res.send(data);
});

const getWeatherTdy = async (loc) => {
  const dataRes = await fetch(
    `https://www.yr.no/api/v0/locations/${loc}/forecast/currenthour`
  );

  if (!dataRes) return null;

  return await dataRes.json();
};

app.listen(3000, () => {
  console.log('started server');
});
