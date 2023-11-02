import { View, Text } from "react-native";
import { useEffect, useState } from "react";

import Button from "../components/Button"

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://138.68.93.188:6001/country/full")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View className='bg-slate-700 px-2 h-full'>
      <Text className="text-white text-2xl my-4">Welcome Travel With Me!</Text>
          {isLoading ? <Text className="text-white">Loading....</Text> :
              <>
                  <Text className="text-white my-4">Here is a list of countries from the backend:</Text>
                  {countries?.map((country) => <Text className="text-white" key={country.id}>{country.title}</Text>)}
              </>}
          <Button>Click me!</Button>
    </View>
  );
};

export default Home;
