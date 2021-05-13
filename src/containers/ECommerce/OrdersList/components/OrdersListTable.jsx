import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import ReactTableBase from '@/shared/components/table/ReactTableBase';
import { useSelector } from 'react-redux';

const OrdersListTable = ({ orderListTableData }) => {
  const tableConfig = {
    isEditable: false,
    isSortable: true,
    isResizable: false,
    withPagination: true,
    withSearchEngine: true,
    manualPageSize: [10, 20, 30, 40],
    placeholder: 'Search...',
  };
  const {done,loading} = useSelector(state=>state.orders);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Orders list</h5>
          </div>
          {(done===true&&loading===false)?<ReactTableBase
            columns={orderListTableData.tableHeaderData}
            data={orderListTableData.tableRowsData}
            tableConfig={tableConfig}
          />:<div style={{ padding: "5%","margin-left":"40%"}}><h6><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></h6> </div> }
        </CardBody>
      </Card>
    </Col>
  );
};

OrdersListTable.propTypes = {
  orderListTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default OrdersListTable;
