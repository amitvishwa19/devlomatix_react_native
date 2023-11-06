import { appConfig } from "../utils/config";

export const consolelog = (msg:any) => {
    if(appConfig.showConsoleLog){
        console.log('ConsoleLog Function : ' + msg)
    }
}