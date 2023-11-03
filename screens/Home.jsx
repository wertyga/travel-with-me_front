import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";

import Button from "../components/Button";

const Item = ({ title, flag, id }) => (
  <Text className="text-white p-2" key={id}>
    {title} {flag}
  </Text>
);

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);

  useEffect(() => {
    if (isFetchingCountries) {
      setIsLoading(true);
      fetch("http://138.68.93.188:6001/country/full")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isFetchingCountries]);

  return (
    <View className="bg-slate-700 px-2 h-full">
      <Text className="text-white text-3xl my-4 font-bold">
        Welcome to Travel With Me!
      </Text>
      <Button onPress={() => setIsFetchingCountries(true)}>
        Click me to load countries
      </Button>
      {isLoading && <Text className="text-white">Loading....</Text>}
      {!isLoading && isFetchingCountries && (
        <>
          <Text className="text-white my-4">
            Here is a list of countries from the backend:
          </Text>
          <FlatList
            data={countries}
            renderItem={({ item }) => <Item {...item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

export default Home;
