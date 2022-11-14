export const localDateTimeFormat = (value:any) => {
    const date = new Date(value).getDate();
    const month = new Date(value).getMonth() + 1;
    const year = new Date(value).getFullYear();
    const time = new Date(value).toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const dateformatted = `${date}-${month}-${year} ${time}`;
    return dateformatted;
  };