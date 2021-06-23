export const IsImage = (url, timeoutT) => {
    const checkIfImage = new Promise(function (resolve, reject) {
        var img = new Image();
        img.onerror = img.onabort = function () {
            reject("error");
        };
        img.onload = function () {
            resolve("success");
        };
        img.src = url;
    });

    return checkIfImage
}