import React from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import Menu from 'components/Menu';
import EditIcon from '@material-ui/icons/Edit';

export default ({ customers, onClick }) => (
  <ReactTable
    filterable
    defaultFilterMethod={(filter, row) =>
      String(row[filter.id]) === filter.value
    }
    data={customers}
    columns={[
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => {
          const menus = [
            {
              name: 'Edit Customer',
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
        Header: 'Address',
        accessor: 'address',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['address'] }),
        filterAll: true,
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['address'] }),
        filterAll: true,
      },
    ]}
  />
);
