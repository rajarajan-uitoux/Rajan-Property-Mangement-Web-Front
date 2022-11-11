import SummaryCard from "./SummaryCard";
import {
  TotalCustomers,
  TotalProperties,
  PropertyTypesImages,
} from "../../utils/constants";
import { 
  useGetTotalCountQuery, 
  useGetPropertyTypesQuery 
} from "../../services/Dashboard";

const SummaryCardModule = () => {
  
  const { data: totalCount } = useGetTotalCountQuery();
  const { data: propertyTypes } = useGetPropertyTypesQuery();

  return (
    <>
      <SummaryCard
        image={TotalCustomers}
        title={"Total Customers"}
        count={totalCount?.customers}
      />
      <SummaryCard
        image={TotalProperties}
        title={"Total Properties"}
        count={totalCount?.properties}
      />
      {totalCount && propertyTypes?.map((property:any, i:number) => (
        <SummaryCard
          image={PropertyTypesImages[i]}
          title={property?.propertyName}
          key={i}
          count={totalCount[`${property?.propertyName.toLowerCase()}`]}
        />
      ))}
    </>
  );
};

export default SummaryCardModule;
