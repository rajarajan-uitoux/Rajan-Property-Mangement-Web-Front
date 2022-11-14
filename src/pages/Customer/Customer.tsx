import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, message, Switch, Table } from "antd";

import TablePagination from "../../components/General/TablePagination";
import { DeleteIcon, SearchIcon } from "../../utils/constants";
import { localDateTimeFormat } from "../../utils/dateTimeconversion";
import { 
  useCustomerListQuery, 
  useStatusUpdateMutation,
  useDeleteCustomerMutation
} from "../../services/customer";
import styles from "./Customer.module.css";

const Customer = () => {
  const [selectedPage, setSelectedPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  const { data, isLoading, refetch } = useCustomerListQuery({pageSize, selectedPage, searchString});
  
  const [mutation] = useDeleteCustomerMutation();
  const [statusMutation] = useStatusUpdateMutation();

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      setSelectedRows(selectedRows);
      setCustomerId(selectedRowKeys);
    },
  };
  useEffect(() => {
    refetch();
  }, [pageSize, selectedPage, searchString]);

  const customersummary = (record:any) => {
    navigate(`/customer/${record.customerUserId}`);
  };

  // update customer status
  const updateStatus = (checked:any, record:any) => {
    statusMutation({
      userId: record.customerUserId,
      status: checked ? "ACTIVE" : "INACTIVE",
    }).then(() =>  message.success("Status updated successfully"));
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      render: (value:any, record:any) => (
        <div
          onClick={() => customersummary(record)}
          style={{ cursor: "pointer", color: "#348fe2" }}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "firstName",
      render: (value:any, record:any) => {
        return (
          <div>
            {value} {record?.lastName}
          </div>
        );
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
    },
    {
      title: "Account Created",
      dataIndex: "accountCreatedDate",
      render: (value:any) => (value ? localDateTimeFormat(value) : "-"),
    },
    {
      title: "User Status",
      dataIndex: "status",
      render: (value:any, record:any) => (
        <Switch
          defaultChecked={value == "ACTIVE" ? true : false}
          onChange={(checked) => updateStatus(checked, record)}
        />
      ),
    },
  ];

  //Delete Customer
  const customerDelete = () => {
    mutation({
      customerIds: customerId,
    }).then(() => {
      message.success("Customer Details deleted successfully");
      setCustomerId(null);
    });
  };

  return (
    <div className={styles.customer_list_main}>
      <div className={styles.customer_list_main_container}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            className="custom_search_bar"
            placeholder="Search Customer"
            onChange={(e) => setSearchString(e.target.value)}
            prefix={<SearchIcon />}
            allowClear
          />
          {customerId && (
            <div className={styles.actions} onClick={customerDelete}>
              <DeleteIcon className={styles.deleteIcon} />
              <span className={styles.actionstitle}>Delete</span>
            </div>
          )}
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data?.rows}
            pagination={false}
            rowSelection={rowSelection}
            loading={isLoading}
            rowKey={"customerUserId"}
            scroll={{
              y: "52vh",
            }}
          />
        </div>
        <div>
          <TablePagination
            pageSize={pageSize}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            setPageSize={setPageSize}
            totalCount={data?.count}
          />
        </div>
      </div>
    </div>
  );
}

export default Customer;
