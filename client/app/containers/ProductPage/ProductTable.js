import React from 'react';
import ReactTable from 'react-table';
import accounting from 'accounting';
import matchSorter from 'match-sorter';
import Menu from 'components/Menu';

import EditIcon from '@material-ui/icons/Edit';

export default ({ products, onClick }) => (
  <ReactTable
    filterable
    defaultFilterMethod={(filter, row) =>
      String(row[filter.id]) === filter.value
    }
    data={products}
    columns={[
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => {
          const menus = [
            {
              name: 'Edit Product',
              onClick: () => onClick(props.original.id),
            },
          ];
          return (
            <Menu menus={menus}>
              {handleClick => (
                <div role="button">
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
          matchSorter(rows, filter.value, { keys: ['name'] }),
        filterAll: true,
      },
      {
        Header: 'Pinyin',
        accessor: 'pinyin',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['pinyin'] }),
        filterAll: true,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Unit',
        accessor: 'unit',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Capital Price',
        accessor: 'capital_price',
        Cell: d => accounting.formatMoney(d.value, 'Rp. ', 2),
      },
      {
        Header: 'Sell Price Credit',
        accessor: 'sell_price_credit',
        Cell: d => accounting.formatMoney(d.value, 'Rp. ', 2),
      },
      {
        Header: 'Sell Price Cash',
        accessor: 'sell_price_cash',
        Cell: d => accounting.formatMoney(d.value, 'Rp. ', 2),
      },
    ]}
  />
);
