export const distinct = (arr, clave) => {
  // console.log(arr);
  let response = arr?.reduce((grupo, elemento) => {
    const valorClave = elemento[clave];
    if (!grupo[valorClave]) {
      grupo[valorClave] = [];
    }
    grupo[valorClave].push(elemento);

    return grupo;
  }, {});
  return arr ? Object?.keys?.(response) : [];
};

export const hasEmptyValues = (obj) => {
  // const objeto = {
  //   TipoSubGrupo: subGroupType,
  //   Grupo: group,
  //   Subgrupo: subgroup,
  //   Cupos: stock,
  //   TipoGrupo: groupType,
  //   Modulo: module
  // };
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined) {
      return true;
    }
  }
  return false;
};
