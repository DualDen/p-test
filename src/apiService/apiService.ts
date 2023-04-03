const apiService = async <T>(url: string,config?: RequestInit):Promise<T> => {
    const response = await fetch(url,config);
    return await response.json();
}

export const api = {
    get: <T>(url:string) => apiService<T>(url),
    post: <TBody extends BodyInit, T>(url:string,body: TBody) => {
        apiService<T>(url,{method:"POST",body});
    }
};