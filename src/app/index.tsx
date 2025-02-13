import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { APIRequest } from "../api/rest";
import { CourseType } from "../types/apiTypes";
import { useRouter } from "expo-router";

const API_URL = "courses"; // iOS için http://localhost, Android için http://10.0.2.2

export default function App() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<CourseType[]>("courses");
    if (response) {
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

  const renderItem = ({ item }: { item: CourseType }) => {
    return (
      <TouchableOpacity
        style={styles.rowsContainer}
        onPress={() => router.push(`/${item.course_id}`)}>
        <Text style={styles.rows}>
          {item.course_code}: {item.course_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.course_id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Courses</Text>}
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
