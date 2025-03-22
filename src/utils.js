const parseJSON = async (response) => {
    try {
        return await response.json();
    } catch (e) {
        return null;
    }
};

export const request = async (url, options) => {
    const response = await fetch(url, options);
    const responseData = await parseJSON(response);
    if (!response.ok) throw new Error(response.statusText, { cause: { status: response.status, responseData } });
    return responseData;
};

export const  formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
}