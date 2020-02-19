interface MyStorage extends Storage{
    userId: number
} declare var localStorage: MyStorage;

export default class localStorageService {
    static setUserId = (userId: number) => {
        localStorage.userId = userId;
    };

    static getUserId = () => {
        return localStorage.userId;
    };
}