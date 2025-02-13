export type CourseType = {
    course_id: number;
    course_code: string;
    course_name: string;
}

export type CourseDetailsType = {
    course_detail_id: number,
    course_id: number,
    lecturer: string,
    schedule: string,
    text_book: string,
    notes: string,
    course_code: string,
    course_name: string
}