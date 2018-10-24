import React from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Menu from 'components/Menu';
import EditIcon from '@material-ui/icons/Edit';

import moment from 'moment';

export default ({ orderInvoices, onClick }) => (
  <ReactTable
    filterable
    defaultFilterMethod={(filter, row) =>
      String(row[filter.id]) === filter.value
    }
    data={orderInvoices}
    columns={[
      {
        Header: 'Order Invoice Id',
        accessor: 'id',
        Cell: props => {
          const menus = [
            {
              name: 'Edit Order Invoice',
              onClick: () => onClick(props.original.id),
            },
          ];
          return (
            <Menu menus={menus}>
              {handleClick => (
                <div role="button" className="link">
                  {props.value}{' '}
                  <EditIcon
                    style={{ fontSize: '16px' }}
                    className="highlight"
                    onClick={handleClick}
                  />
                </div>
              )}
            </Menu>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['id'] }),
        filterAll: true,
      },
      {
        Header: 'Payment Status',
        accessor: 'payment_status',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['payment_status'] }),
        filterAll: true,
        Cell: props => <div>{props.value ? 'Paid' : 'Not Paid'}</div>,
      },
      {
        Header: 'Total Buy Price',
        accessor: 'total_buy_price',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['total_buy_price'] }),
        filterAll: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['description'] }),
        filterAll: true,
      },
      {
        Header: 'Date',
        accessor: 'date',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['date'] }),
        Cell: props => <div>{moment(props.value).format('YYYY-MM-DD')}</div>,
        filterAll: true,
      },
    ]}
  />
);
