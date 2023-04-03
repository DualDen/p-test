export const dateParser = (date:number) => {
    return new Date(date * 1000).toLocaleString();
}