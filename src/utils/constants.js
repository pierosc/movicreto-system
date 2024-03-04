const getUser = JSON.parse(sessionStorage.getItem("user"));
const periodDefault = JSON.parse(sessionStorage.getItem("periodDefault"));
const period = JSON.parse(sessionStorage.getItem("period"));

export { getUser, periodDefault, period };
