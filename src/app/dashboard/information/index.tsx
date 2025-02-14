import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { CourseType, UniversityType } from "@/src/types/apiTypes";
import { useRouter } from "expo-router";

const API_URL = "courses"; // iOS için http://localhost, Android için http://10.0.2.2

export default function University() {
  const [courses, setCourses] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState(true);
  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<UniversityType[]>("get-universities");
    if (response) {
      console.log(response);
      setCourses(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const onRefresh = async () => {
    setLoading(true);
    await fetchData();
  };

  const renderItem = ({ item }: { item: UniversityType }) => {
    return (
      <TouchableOpacity
        style={styles.rowsContainer}
        onPress={() =>
          router.push({
            pathname: `./information/faculty`,
            params: { university_id: item.university_id.toString() },
          })
        }>
        <Text style={styles.rows}>
          {item.name}: {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.university_id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Universiteler</Text>}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={loading} />
      }
      style={styles.flatList}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 20,
  },
  rowsContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  rows: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
