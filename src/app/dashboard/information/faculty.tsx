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
import { FacultyType } from "@/src/types/apiTypes";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Faculty() {
  const [courses, setCourses] = useState<FacultyType[]>([]);
  const [loading, setLoading] = useState(true);

  const { university_id } = useLocalSearchParams<{ university_id: string }>();

  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<FacultyType[]>(
      `get-faculties/${university_id}`
    );
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

  const renderItem = ({ item }: { item: FacultyType }) => {
    return (
      <TouchableOpacity
        style={styles.rowsContainer}
        onPress={() =>
          router.push({
            pathname: `./department`,
            params: { faculty_id: item.faculty_id.toString() },
          })
        }>
        <Text style={styles.rows}>{item.faculty_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.faculty_id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Fakülteler</Text>}
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
