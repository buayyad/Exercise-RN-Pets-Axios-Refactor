import { getPetById, deletePet as deletePetAPI } from "@/api/pets";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Pet } from "@/data/pets";
import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();

  const {
    data: pet,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetById(petId as string),
    enabled: !!petId,
  });

  const deletePet = async (petId: number) => {
    try {
      await deletePetAPI(petId.toString());
      router.back();
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pet?.name || "Pet Details" }} />
      {isLoading && <ActivityIndicator size="large" />}
      {error && <Text>An Error occurred, try again later</Text>}
      {pet && (
        <>
          <Text style={styles.name}>{pet.name}</Text>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <Text style={styles.type}>Type: {pet.type}</Text>
        </>
      )}

      <View>
        {pet && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => deletePet(pet?.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
