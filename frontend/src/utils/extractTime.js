export function extractTime(dateString){
    const date=new Date(dateString)
    const hours=padZero(date.getHours());
    const minutes=padZero(date.getMinutes());
    const timeOfPost=date.toUTCString();
    let finalTime=""
    for(let i=4;i<=15;i++){
        finalTime+=timeOfPost[i];
    }
    return `${finalTime}`
}

function padZero(number){
    return number.toString().padStart(2,"0");
}