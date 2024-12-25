export type BirthDay = {
    first: string;
    second: string;
    third: string;
}
export type Info = {
    fieldName: string;
    value: string | BirthDay;
};