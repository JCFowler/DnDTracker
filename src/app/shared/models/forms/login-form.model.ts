export interface LoginFormModel {
    email: string;
    password: string;
}


export function loginToFormModel(login: any): any {
    return {
        email: login.email,
        password: login.password
    };
}
