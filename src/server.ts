import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// set up
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// routes
app.get('/api/:date', (req: Request, res: Response) => {
  const { date } = req.params;

  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (isDate) {
    const dateFormat = new Date(date);

    // get utc to format
    const dateUtcFormat = dateFormat.toUTCString();

    // get unix time
    const unixTime = dateFormat.getTime();

    // responses
    res.json({
      unix: unixTime,
      utc: dateUtcFormat,
    })
  } else {
    // get unix to utc
    const newDate = new Date(Number(date));
    const dateUtc = newDate.toUTCString();
  
    // responses
    res.json({
      unix: date,
      utc: dateUtc,
    })
  }

});

app.listen(PORT, () => {
  console.log(`Server is running in: ${PORT}`)
});