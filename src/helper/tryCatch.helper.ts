const tryCatch = async (promise:any) => {
    try {
      const data = await promise
      return [data, null]
    } catch (err:any) {
      console.error(err)
      return [null, err]
    }
  };
  export default tryCatch;