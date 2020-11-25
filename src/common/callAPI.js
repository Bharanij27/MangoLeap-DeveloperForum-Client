const callAPI = async (url, data, fetchMethod) => {
    let apiCall = await fetch(url, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    let apiResult = await apiCall.json();
    return apiResult;
}

export default callAPI;