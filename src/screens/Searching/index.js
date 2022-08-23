import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Data from "../../data/generated.json";
import Searching from "../../components/Searching";
import AntDesign from "react-native-vector-icons/AntDesign";
const SearchingAndListing = () => {
  const [searching, setSearching] = useState("");
  const listing = ["name"];
  const render = [
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Email",
      value: "email",
    },
    {
      title: "Phone",
      value: "phone",
    },
    {
      title: "Company",
      value: "company",
    },
    // {
    //   title: "Gender",
    //   value: "gender",
    // },
    {
      title: "Eye Color",
      value: "eyeColor",
    },
  ];
  const onSearching = (item, field, sort) => {
    return onSortingByField(field, sort).filter((data) => {
      return (
        item?.length === 0 ||
        data?.name?.toLowerCase().includes(item.trim().toLowerCase())
      );
    });
  };
  const onMultipleSearching = (item, field, sort) => {
    return onSortingByField(field, sort).filter((data) => {
      return (
        item?.length === 0 ||
        listing.some((list) => {
          return data?.[list]
            ?.toLowerCase()
            ?.includes(item.trim()?.toLowerCase());
        })
      );
    });
  };
  const onSortingByField = (item, sort) => {
    if (sort === "asc") {
      return Data.sort((a, b) => {
        return a[item] > b[item] ? 1 : -1;
      });
    } else if (sort === "desc") {
      return Data.sort((a, b) => {
        return a[item] < b[item] ? 1 : -1;
      });
    }
    return Data;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <View style={styles.searchingContainer}>
          <View style={styles.leftSearchingArea}>
            <TextInput
              style={{ flex: 1 }}
              placeholder={"Search................."}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={searching}
              onChangeText={setSearching}
            />
          </View>
          <Pressable style={styles.rightSearchingArea}>
            <AntDesign name="search1" size={30} color={"white"} />
          </Pressable>
        </View>
        <FlatList
          data={onMultipleSearching(searching, "company", "asc")}
          renderItem={({ item }) => (
            <Searching searching={item} render={render} />
          )}
          keyExtractor={(item) => item._id}
        />

        {/* <Searching data-source={data}  render={render} onSortingByField={sort} /> */}
      </View>
    </SafeAreaView>
  );
};

export default SearchingAndListing;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  secondaryContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchingContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#C4C4C4",
  },
  leftSearchingArea: {
    flex: 3,
    paddingHorizontal: 10,
  },
  rightSearchingArea: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  },
});
