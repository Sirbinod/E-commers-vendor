import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ReactTableBase from "../../../../shared/components/table/ReactTableBase";

const UserListTable = ({ userListTableData, data }) => {
  const tableConfig = {
    isEditable: false,
    isSortable: true,
    isResizable: false,
    withPagination: true,
    withSearchEngine: true,
    manualPageSize: [10, 20, 30, 40],
    placeholder: "Search...",
  };
  console.log(userListTableData.tableRowsData);
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody className="products-list">
          <div className="card__title">
            <h5 className="bold-text">Users List</h5>
            {/* <ButtonToolbar className="products-list__btn-toolbar-top"> */}
            {/* <Link className="btn btn-primary products-list__btn-add" to="/e-commerce/product_edit">Add new
                product
              </Link> */}
            {/* </ButtonToolbar> */}
          </div>
          <ReactTableBase
            columns={userListTableData.tableHeaderData}
            data={userListTableData.tableRowsData}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

UserListTable.propTypes = {
  userListTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        name: PropTypes.any,
      })
    ),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

export default UserListTable;
