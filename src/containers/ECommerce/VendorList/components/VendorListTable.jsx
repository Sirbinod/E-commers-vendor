import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";

import ReactTableBase from "../../../../shared/components/table/ReactTableBase";

const VendorListTable = ({ vendorListTableData, data }) => {
  const tableConfig = {
    isEditable: false,
    isSortable: true,
    isResizable: false,
    withPagination: true,
    withSearchEngine: true,
    manualPageSize: [10, 20, 30, 40],
    placeholder: "Search...",
  };
  console.log(vendorListTableData.tableRowsData);
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody className="products-list">
          <div className="card__title">
            <h5 className="bold-text">Vendors List</h5>
            {/* <ButtonToolbar className="products-list__btn-toolbar-top"> */}
            {/* <Link className="btn btn-primary products-list__btn-add" to="/e-commerce/product_edit">Add new
                product
              </Link> */}
            {/* </ButtonToolbar> */}
          </div>
          <ReactTableBase
            columns={vendorListTableData.tableHeaderData}
            data={vendorListTableData.tableRowsData}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

VendorListTable.propTypes = {
  vendorListTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        name: PropTypes.any,
      })
    ),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

export default VendorListTable;
