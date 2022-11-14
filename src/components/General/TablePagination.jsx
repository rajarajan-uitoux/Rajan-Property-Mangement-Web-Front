import { Dropdown, Menu, Pagination} from "antd";
import React from "react";
import { dropdownArrowBold} from "../../utils/constants";

export default function TablePagination({
  pageSize,
  setSelectedPage,
  setPageSize,
  selectedPage,
  totalCount,
}) {
  const handleMenuClick = ({ key }) => {
    setPageSize(menuItems?.find((f) => f.key === key)?.label || "10");
    setSelectedPage("1");
  };

  const menuItems = [
    {
      label: "10",
      key: "1",
      onClick: handleMenuClick,
    },
    {
      label: "20",
      key: "2",
      onClick: handleMenuClick,
    },
    {
      label: "50",
      key: "3",
      onClick: handleMenuClick,
    },
    {
      label: "100",
      key: "4",
      onClick: handleMenuClick,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "max-content",
        justifyContent: "space-between",
        marginTop: "18px",
      }}
    >
      {totalCount && totalCount >= 10 ? (
        <div
          style={{
            display: "flex",
            width: "max-content",
            height: "max-content",
            alignItems: "center",
          }}
        >
          <Dropdown
            trigger={"click"}
            className="custom_dropdown_button"
            overlay={
              <Menu className="custom_dropdown_button_menu" items={menuItems} />
            }
            placement="bottomRight"
          >
            <div>
              {pageSize}
              <img
                style={{ marginLeft: "12px" }}
                src={dropdownArrowBold}
                alt="arrow"
              />
            </div>
          </Dropdown>
          <div
            style={{
              display: "flex",
              width: "max-content",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16px",
              letterSpacing: "0.001em",
              textAlign: "left",
              marginLeft: "20px",
              color: "#A1A6B7",
            }}
          >
            Showing{" "}
            {Number(selectedPage) * Number(pageSize) - Number(pageSize) + 1} -{" "}
            {Math.min(
              Number(selectedPage) * Number(pageSize),
              Number(totalCount)
            )}{" "}
            of {totalCount} entries
          </div>
        </div>
      ) : null}
      <Pagination
        onChange={(page) => setSelectedPage(String(page))}
        defaultCurrent={"1"}
        total={totalCount || "1"}
        hideOnSinglePage={true}
        showSizeChanger={false}
        pageSize={pageSize}
        current={Number(selectedPage)}
      />
    </div>
  );
}
