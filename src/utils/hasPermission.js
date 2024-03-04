export const hasPermission = (value) => {
  const UserPermissions = JSON.parse(
    sessionStorage.getItem("user")
  )?.PERMISOS?.map((v) => {
    return v?.CODIGO;
  });

  if (typeof value === "string" || typeof value === "number") {
    return UserPermissions?.includes(value);
  }
  if (typeof value === "object") {
    return value.some((e) => UserPermissions.includes(e));
  }
};
