import { get, post } from '@/uitls/request/index';
import { page3Data, page2Data, page1Data } from "@/test/form";

const Api = {
    page1: "/largeScreen/getDeviceListDatas",
    page2: "/largeScreen/getTempVibraSensorListDatas",
    page3: "/largeScreen/getElectricitySensorListDatas"
}

export const getPage1 = () => {
    return get(Api.page1);
    // return new Promise((resolve, reject) => {
    //     resolve(page1Data);
    // })
}


export const getPage2 = () => {
    return get(Api.page2);
    // return new Promise((resolve, reject) => {
    //     resolve(page2Data);
    // })
}

export const getPage3 = () => {
    return get(Api.page3);
    // return new Promise((resolve, reject) => {
    //     resolve(page3Data);
    // })
}