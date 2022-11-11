import { Suspense } from "react";
import Loader from "../Layout/Loader";

const Loadable = (Component:any) => (props:any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;