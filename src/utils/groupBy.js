export function groupBy(arr, clave) {
  return arr.reduce((grupo, elemento) => {
    const valorClave = elemento[clave];
    if (!grupo[valorClave]) {
      grupo[valorClave] = [];
    }
    grupo[valorClave].push(elemento);
    return grupo;
  }, {});
}

export function groupByFields(data, groupBy) {
  const groupedData = {};
  data.forEach((item) => {
    const groupKey = groupBy.map((key) => item[key]).join("_");

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = { ...item };
      groupedData[groupKey].detail = [];
    }

    // Crear una copia del objeto excluyendo las propiedades en groupBy
    const detailItem = Object.fromEntries(
      Object.entries(item).filter(([key]) => !groupBy.includes(key))
    );

    groupedData[groupKey].detail.push(detailItem);
  });

  let finalgroupedData = Object.values(groupedData);
  // let finalData = []
  // finalgroupedData.forEach(element => {
  //   console.log(Object.keys(element))
  //   const keys = Object.keys(element)
  //   keys.forEach(key => {
  //   if(groupBy.includes(key)){

  //   }

  //   });
  // });
  // console.log(Object.values(groupedData));
  // console.log(groupedData);
  // console.log(detail)

  // const finalgroupedData = Object.values(groupedData).map(
  //   ({ detail, ...rest }) => ({
  //     ...rest,
  //     detail,
  //   })
  // );
  // const dataToDelete = Object.keys(finalgroupedData);
  // console.log(dataToDelete);

  return finalgroupedData;
}
