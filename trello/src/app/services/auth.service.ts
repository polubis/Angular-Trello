import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    isAuthenticated: boolean = false;
    constructor(){
        const isAuth = this.getASpecyficCookieValue("auth", document.cookie);
        this.isAuthenticated = isAuth !== "";
    }


    getASpecyficCookieValue(nameOfValue: string, cookies: string): string {
        const index = cookies.search(nameOfValue);
        let value = "";
        
        if(index === -1)
            return "";
        
        else{
            for(let i = index + nameOfValue.length+1; i < cookies.length; i++){
                if(cookies.charAt(i) === ";")
                    return value;
                 else
                    value += cookies.charAt(i);
            }
        }
        return value;
    }
    
    setCookie(name: string, expDays: number, path: string, value: string){
        const date = new Date();
        date.setTime(date.getTime() + (expDays*24*60*60*1000));
        const expireDate = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expireDate + ";path=" + path;
        this.isAuthenticated = true;
    }
    deleteCookie(name, expDate = "Thu, 01 Jan 1970 00:00:01 GMT"){
        document.cookie = name + "=; expires=" + expDate;
        this.isAuthenticated = false;
    }
}