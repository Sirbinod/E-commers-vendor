import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import ReactTableBase from "../../../../shared/components/table/ReactTableBase";

const ProductsListTable = ({ productListTableData, data }) => {
  const tableConfig = {
    isEditable: false,
    isSortable: true,
    isResizable: false,
    withPagination: true,
    withSearchEngine: true,
    manualPageSize: [10, 20, 30, 40],
    placeholder: "Search...",
  };
  console.log(productListTableData.tableRowsData);
  const { done, loading } = useSelector((state) => state.items);
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody className="products-list">
          <div className="card__title">
            <h5 className="bold-text">Products List</h5>
          </div>
          {done === true && loading === false ? (
            <ReactTableBase
              columns={productListTableData.tableHeaderData}
              data={productListTableData.tableRowsData}
              tableConfig={tableConfig}
            />
          ) : (
            <div style={{ padding: "5%", "margin-left": "40%" }}>
              <h6>
                <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
              </h6>{" "}
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

ProductsListTable.propTypes = {
  productListTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        name: PropTypes.any,
      })
    ),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

export default ProductsListTable;
