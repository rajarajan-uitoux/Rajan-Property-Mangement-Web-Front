import { useEffect } from "react";
import styles from "./DashBoard.module.css";
import Chart from "react-apexcharts";
import { xAxisField } from "../../utils/constants";
import { 
  useGetCustomerChartQuery,
  useGetTotalCountQuery
} from "../../services/Dashboard";

const ComponentChart = ({ datelabel, title, property } :any) => {

  const { data: totalCount } = useGetTotalCountQuery();

  const { data, refetch } = useGetCustomerChartQuery({datelabel, property});
  let seriesArr = [];
  if (datelabel === "today") {
    const returnObj = data?.rows[0];
    let lastTime = 0;
    for (const i in returnObj) {
      if (i == '12to02' ) lastTime = returnObj[i];
      if (!(i == '12to02' || i == '02to04' || i == '04to06'))
      seriesArr.push(returnObj[i]);
    }
    seriesArr.push(lastTime);
  } else if (datelabel === "month") {
    const returnObj = data?.rows;
    for (let i = 0; i < 31; i++) {
      seriesArr.push(0);
    }
    for (let i = 0; i < returnObj?.length; i++) {
      seriesArr[new Date(returnObj[i]?.dateName)?.getDate() - 1] = returnObj[i].counts;
    }
  } else if (datelabel === "year") {
    const returnObj = data?.rows;
    for (let i = 0; i < 12; i++) {
      seriesArr.push(0);
    }
    for (let i = 0; i < returnObj?.length; i++) {      
      seriesArr[getMonthNumber(returnObj[i]?.monthName) - 1] = returnObj[i].count;
    }
  };
  
  const seriesValue:any = [
    {
      name: property,
      data: seriesArr,
    },
  ];

  const options:any = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
      width: 2,
    },
    colors: ["#4DB86B"],
    xaxis: {
      categories: xAxisField[datelabel],
      labels: {
        style: {
          colors: "#A1A6B7",
          fontSize: "12px",
          fontFamily: "Montserrat",
          fontWeight: 500,
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontFamily: "Montserrat",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 250,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#A1A6B7",
          fontSize: "12px",
          fontFamily: "Montserrat",
          fontWeight: 500,
        },
      },
    },
  };

  useEffect(() => {
    refetch();
  }, [datelabel]);

  return (
    <div className={styles.customerchartcard}>
      <div className={styles.cardheader}>
        <div style={{ marginLeft: "15px" }}>
          <div className={styles.cardtitle}>{property}</div>
          <div className={styles.totalvalue}>
            {
            property === "Customers" 
            ? totalCount?.customers 
            : totalCount?.properties
            } {property}</div>
        </div>
        <div className={styles.datelabel}>{title?.toUpperCase()}</div>  
      </div>
      <Chart
        options={options}
        series={seriesValue}
        type="area"
        width={"100%"}
        height={"90%"}
      />
    </div>
  );
};

export const getMonthNumber = (monthName:String) => {
  return new Date(Date.parse(monthName +" 1, 2025")).getMonth()+1; 
};

export default ComponentChart;