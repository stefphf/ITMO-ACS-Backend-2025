export interface UserDto {
    id: number | null;
    username: string;
    email: string;
    firstName?: string;
    secondName?: string;
    avatar?: string; // base64 or url
}
