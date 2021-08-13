export const notEmpty = (...str: string[]) => {
    str.forEach((s) => {
        console.log("s :" + s.trim().length);
        if (s.trim().length == 0) {
            return true;
        }
    });

    return false;
};
