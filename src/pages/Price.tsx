import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"

type Coin = {
    asset_id_base: string;
    asset_id_quote: string;
    rate: number;
}

export default function Price () {
  // Our api key from coinapi.io.
  const apiKey = "API KEY";
  // Grabbing the currency symbol from the URL Params.
  const params = useParams()
  const symbol = params.symbol
  // Using the other two variables to create our URL.
  const url = `https://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  // State to hold the coin data.
  const [coin, setCoin] = useState<Coin | null>(null);

  // Function to fetch coin data.
  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setCoin(data);
    } catch(e) {
      console.error(e)
    }
  };

  // useEffect to run getCoin when component mounts.
  useEffect(() => {
    getCoin();
  }, []);

  // loaded function for when data is fetched.
  const loaded = () => {
    return (
      <div>
        <h1>
          {coin?.asset_id_base}/{coin?.asset_id_quote}
        </h1>
        <h2>{coin?.rate}</h2>
      </div>
    );
  };

  // Function for when data doesn't exist.
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  // If coin has data, run the loaded function; otherwise, run loading.
  return coin && coin.rate ? loaded() : loading();
}