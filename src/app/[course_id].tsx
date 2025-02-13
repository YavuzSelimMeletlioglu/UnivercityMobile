import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CourseDetailsType } from "../types/apiTypes";
import { APIRequest } from "../api/rest";

type RowProps = {
  rowNameText: string;
  dataText: string;
};

export default function CourseDetailScreen() {
  const [courseDetail, setCourseDetail] = useState<CourseDetailsType | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(true);
  const { course_id } = useLocalSearchParams<{ course_id: string }>();
  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const fetchData = async () => {
    const response = await instance.get<CourseDetailsType>(
      `course-details/${course_id}`
    );
    if (response) {
      setCourseDetail(response);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (refreshing) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (!courseDetail) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Kurs Detaylarına Erişilemedi
        </Text>
        <Button title="Kurs Sayfasına Dönünüz" onPress={() => router.back()} />
      </View>
    );
  }

  const Row = ({ rowNameText, dataText }: RowProps) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowName}>{rowNameText} :</Text>
        <Text style={styles.text}>{dataText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {courseDetail.course_code}: {courseDetail.course_name}
      </Text>
      <Row rowNameText="Eğitmen" dataText={courseDetail.lecturer} />
      <Row rowNameText="Takvim" dataText={courseDetail.schedule} />
      <Row rowNameText="Yardımcı Kaynak" dataText={courseDetail.text_book} />
      <Row rowNameText="Notlar" dataText={courseDetail.notes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    rowGap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    columnGap: 5,
    backgroundColor: "#fff",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#888",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rowName: {
    fontWeight: "700",
    marginLeft: 20,
  },
  text: {
    fontSize: 15,
  },
});
