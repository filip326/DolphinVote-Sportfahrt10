export default interface User {
    _id: string;
    name: string;
    voted: boolean;
    cookie?: string;
}
