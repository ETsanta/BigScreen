import { get, post } from '@/unitls/request/index';

const Api = {
    page1: "/api/page1",
    page2: "/api/page1",
    page3: "/api/page1"
}

export const getPage1 = () => {
    return get(Api.page1);
}


export const getPage2 = () => {
    return get(Api.page12);
}


export const getPage3 = () => {
    return get(Api.page3);
}