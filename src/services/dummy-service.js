import  { helper } from "./helper-service.js";

const execute= () => {
    const result=helper();
    if(result) 
        return "Learning JS";
    else 
        return "Learning ReactJs";
}

module.exports={
    execute
}