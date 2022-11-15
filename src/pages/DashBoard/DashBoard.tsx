import { useMemo, useState } from "react";
import ComponentChart from "../../components/DashBoard/ComponentChart";
import { Select } from "antd";
import styles from "./DashBoard.module.css";
import SummaryCardModule from "../../components/DashBoard/SummaryCardModule";
const { Option } = Select;

const filterOptions = [
  { name: "Today", value: "today" },
  { name: "This Month", value: "month" },
  { name: "This Year", value: "year" },
];

const DashBoard = () => {
  const [datelabel, setDatelabel] = useState("today");
  const [title,setTitle]=useState("today")

  const memoizedSummary = useMemo(() => <SummaryCardModule />, []);

  const selectedRange = (value:any,option:any) => {
    
    setDatelabel(value);
    setTitle(option.children)
  };

  return (
    <div className={styles.dashboard_main}>
      <div className={styles.summarycards}>{memoizedSummary}</div>
      <div className={styles.insightcontainer}>
        <div className={styles.insighttext}>Insights</div>
        <div className={styles.datefilter}>
          <Select
            defaultValue="Today"
            onChange={selectedRange}
            style={{ width: "150px" }}
          >
            {filterOptions &&
              filterOptions.map((item, i) => (
                <Option value={item.value} key={i}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <div className={styles.chartcontainer}>
        <ComponentChart datelabel={datelabel} title={title} property= "Customers" />
        <ComponentChart datelabel={datelabel} title={title} property= "Properties" />
      </div>
    </div>
  );
};

export default DashBoard;