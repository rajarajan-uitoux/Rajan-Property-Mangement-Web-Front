export const getPathName = (pathNameList:any, index:string) =>
  `/${pathNameList
    .slice(0, index + 1)
    .map((el:any) => el.link)
    .join("/")}`;

export const getPathArray = (pathname:any) => {
  const decodedUrl = decodeURI(pathname);
  return decodedUrl
    .split("/")
    .map((el) => ({
      name: el
        .split("-")
        .map((ell) => ell.charAt(0).toUpperCase() + ell.slice(1))
        .join(" "),
      link: el,
    }))
    .filter((el) => el.name);
};
