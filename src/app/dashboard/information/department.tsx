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
import { DepartmentType } from "@/src/types/apiTypes";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Department() {
  const [courses, setCourses] = useState<DepartmentType[]>([]);
  const [loading, setLoading] = useState(true);

  const { faculty_id } = useLocalSearchParams<{ faculty_id: string }>();

  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<DepartmentType[]>(
      `get-departments/${faculty_id}`
    );
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

  const renderItem = ({ item }: { item: DepartmentType }) => {
    return (
      <TouchableOpacity
        style={styles.rowsContainer}
        onPress={() =>
          router.push({
            pathname: `./course`,
            params: { department_id: item.department_id.toString() },
          })
        }>
        <Text style={styles.rows}>{item.department_name}</Text>
        <Text style={styles.rows}>Dekan : {item.dean}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.department_id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Bölümler</Text>}
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
