import { Divider, Popover, Switch, Table } from "antd";
import {
  BackIcon,
  customerImage,
  InfoIcon,
  PropertyDetails,
} from "../../utils/constants";
import styles from "./Customer.module.css";
import TablePagination from "../../components/General/TablePagination";
import { useCustomerDetailsQuery } from "../../services/customer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";;

const CustomerSummary = () => {
  
  const { id } = useParams();
  const [selectedPage, setSelectedPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [searchString, setSearchString] = useState("");
  const { data, isLoading, refetch } = useCustomerDetailsQuery(
    {id, pageSize, selectedPage, searchString}
  );

  useEffect(() => {
    refetch();
  }, [pageSize, selectedPage, searchString]);

  const cornerTable = (record:any) => (
    <table>
      <tr
        style={{
          backgroundColor: "#F5F5F5",
          height: "40px",
          width: "100%",
          position: "sticky",
          top: 0,
        }}
      >
        <th>Corners</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>

      {record?.map((corner:any) => (
        <tr className={styles.cornerdatarow}>
          <td>{corner.points}</td>
          <td>{corner.latitude}</td>
          <td>{corner.longitude}</td>
        </tr>
      ))}
    </table>
  );
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {}, [params]);

  const columns = [
    {
      title: "Property ID",
      dataIndex: "ptyId",
    },
    {
      title: "Survey Number",
      dataIndex: "serveyNo",
      render: (value:any) => (value ? value : "-"),
    },
    {
      title: "Property Type",
      dataIndex: "propertyName",
      render: (value:any) => (value ? value : "-"),
    },
    {
      title: "Plot No",
      dataIndex: "plotNo",
      render: (value:any) => (value ? value : "-"),
    },
    {
      title: "Area",
      dataIndex: "area",
      render: (value:any) => (value ? value : "-"),
    },
    {
      title: "Corners",
      dataIndex: "propertyCorners",
      render: (value:any) => {
        return (
          <div>
            {value?.length}
            <Popover
              title={"Corners"}
              content={cornerTable(value)}
              placement="right"
              trigger="click"
              className="cornerpopover"
            >
              <img src={InfoIcon} style={{ cursor: "pointer" }} />
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Added Date",
      dataIndex: "registrationDate",
      render: (value:any) => (value ? value : "-")
    },
  ];
  
  return (
    <div className={styles.customer_details_main}>
      <div onClick={() => navigate("/customer")} className={styles.backtext}>
        <BackIcon />
        <span style={{ marginLeft: "10px" }}>Back</span>
      </div>

      <div className={styles.customer}>
        <div>Customer ID</div>
        <div className={styles.customerId}>
          {data?.customerDetail[0].customerId}
        </div>
        <div className={styles.userstatus}>
          User Status <Switch defaultChecked={true} />
        </div>
      </div>

      <div className={styles.customercards}>
        <div className={styles.cutomerdetailcard}>
          <div className={styles.customerdetailtext}>Customer Details </div>
          <div className={styles.summaryContainer}>
            <div>
              <img src={customerImage} />
            </div>
            <div className={styles.customerdetails}>
              <div className={styles.customername}>
                {data?.customerDetail[0].customerUserName}
              </div>
              <div className={styles.customerphone}>
                {data?.customerDetail[0].phoneNumber}
              </div>
              <div className={styles.customeremail}>
                {data?.customerDetail[0].emailId}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.propertydetailcard}>
          <div className={styles.customerdetailtext}>Property Details </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div>
              <img src={PropertyDetails} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <div className={styles.totalno}>
                {data?.totalProperties}
              </div>
              <div>Total Properties</div>
            </div>
          </div>
          <div className={styles.properties}>
            <div className={styles.propertytype}>
              <div className={styles.totalno}>
                {data?.commercialCount}
              </div>
              <div>Commercial</div>
            </div>
            <Divider
              type={"vertical"}
              style={{ height: "70%", color: "#B7BABB" }}
            />
            <div className={styles.propertytype}>
              <div className={styles.totalno}>
                {data?.industrialCount}
              </div>
              <div>Industrial</div>
            </div>
            <Divider
              type={"vertical"}
              style={{ height: "70%", color: "#B7BABB" }}
            />
            <div className={styles.propertytype}>
              <div className={styles.totalno}>
                {data?.agriculturalCount}
              </div>
              <div>Agricultural</div>
            </div>
            <Divider
              type={"vertical"}
              style={{ height: "70%", color: "#B7BABB" }}
            />
            <div className={styles.propertytype}>
              <div className={styles.totalno}>
                {data?.residentialCount}
              </div>
              <div>Residential</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.customer_list_main_container}>
        <div className={styles.title}>Properties</div>
        <Table
          columns={columns}
          dataSource={data?.rows}
          pagination={false}
          rowSelection={{}}
          rowKey={(data) => data.propertyId}
          scroll={{
            y: "25vh",
          }}
        />
        <TablePagination
          pageSize={pageSize}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setPageSize={setPageSize}
          totalCount={data?.count}
        />
      </div>
    </div>
  );
}

export default CustomerSummary;
