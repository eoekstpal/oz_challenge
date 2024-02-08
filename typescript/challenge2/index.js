"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//클래스 정의
class ApiHandler {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    //endpoint (ex. /users, /posts)
    fetchData(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = this.baseUrl + endpoint;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                throw new Error(`에러발생: ${error}`);
            }
        });
    }
}
//메인함수
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = `https://jsonplaceholer.typicode.com`;
        const apiHandler = new ApiHandler(baseUrl);
        try {
            const posts = yield apiHandler.fetchData("/posts");
            posts.forEach((post) => console.log(post));
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
