import React from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Menu from 'components/Menu';
import EditIcon from '@material-ui/icons/Edit';

import moment from 'moment';

export default ({ invoices, onClick }) => (
  <ReactTable
    filterable
    defaultFilterMethod={(filter, row) =>
      String(row[filter.id]) === filter.value
    }
    data={invoices}
    columns={[
      {
        Header: 'Customer Name',
        accessor: 'Customer',
        Cell: props => {
          const menus = [
            {
              name: 'Edit Invoice',
              onClick: () => onClick(props.original.id),
            },
          ];
          return (
            <Menu menus={menus}>
              {handleClick => (
                <div role="button" className="link">
                  {props.value.name}{' '}
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
          matchSorter(rows, filter.value, { keys: ['customerName'] }),
        filterAll: true,
      },
      {
        Header: 'Payment Status',
        accessor: 'payment_status',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['payment_status'] }),
        filterAll: true,
      },
      {
        Header: 'Payment Type',
        accessor: 'payment_type',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['payment_type'] }),
        filterAll: true,
      },
      {
        Header: 'Total Capital',
        accessor: 'total_capital',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['total_capital'] }),
        filterAll: true,
      },
      {
        Header: 'Total Sell Price',
        accessor: 'total_sell_price',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['total_sell_price'] }),
        filterAll: true,
      },
      {
        Header: 'Total Profit',
        accessor: 'total_profit',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['total_profit'] }),
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
