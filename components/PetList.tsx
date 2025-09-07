import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Pet } from "@/data/pets";
import { getPets } from "@/api/pets";
import PetItem from "./PetItem";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

const PetList = () => {
  const {
    data: pets = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      <View style={[styles.filterContainer, { alignContent: "center" }]}>
        <TextInput placeholder="Search for a pet" style={styles.searchInput} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push("/addPet")}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading && <ActivityIndicator size="large" />}
      {error && <Text>An Error occurred, try again later</Text>}
      {pets.map((pet: Pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "75%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
