import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import accounting from 'accounting';

import ConfirmDialog from 'components/ConfirmDialog';

export default ({
  transactions = [],
  onEdit,
  onDelete,
  onEditReturn,
  onDeleteReturn,
}) => (
  <Paper>
    <Typography variant="title" id="tableTitle" className="ml-3 pt-3">
      Transaction List
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Pinyin</TableCell>
          <TableCell numeric>Capital Price</TableCell>
          <TableCell numeric>Sell Price</TableCell>
          <TableCell numeric>Amount</TableCell>
          <TableCell numeric>Total Sell Price</TableCell>
          <TableCell numeric>Profit</TableCell>
          <TableCell numeric />
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map(transaction => (
          <Fragment key={transaction.id}>
            <TableRow>
              <TableCell component="th" scope="row">
                {transaction.Product.name}
              </TableCell>
              <TableCell>{transaction.Product.pinyin}</TableCell>
              <TableCell numeric>
                {accounting.formatMoney(transaction.capital_price, 'Rp. ', 2)}
              </TableCell>
              <TableCell numeric>
                {accounting.formatMoney(transaction.sell_price, 'Rp. ', 2)}
              </TableCell>
              <TableCell numeric>{transaction.amount}</TableCell>
              <TableCell numeric>
                {accounting.formatMoney(
                  transaction.total_sell_price,
                  'Rp. ',
                  2,
                )}
              </TableCell>
              <TableCell numeric>
                {accounting.formatMoney(transaction.profit, 'Rp. ', 2)}
              </TableCell>
              <TableCell numeric>
                <div className="d-flex align-items-center justify-content-between">
                  <Tooltip title="Edit" placement="bottom">
                    <EditIcon
                      style={{ fontSize: '16px' }}
                      className="highlight"
                      onClick={() => onEdit(transaction.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete" placement="bottom">
                    <div>
                      <ConfirmDialog
                        title="Are you sure?"
                        content="this cannot be undone"
                        onYes={() => onDelete(transaction.id)}
                      >
                        {handleClickOpen => (
                          <ClearIcon
                            style={{ fontSize: '16px' }}
                            className="highlight"
                            onClick={handleClickOpen}
                          />
                        )}
                      </ConfirmDialog>
                    </div>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            {transaction.ReturnTransaction && (
              <TableRow className="ml-3">
                <TableCell colSpan="2">Return Item</TableCell>
                <TableCell numeric>
                  {accounting.formatMoney(transaction.capital_price, 'Rp. ', 2)}
                </TableCell>
                <TableCell numeric>
                  {accounting.formatMoney(transaction.sell_price, 'Rp. ', 2)}
                </TableCell>
                <TableCell numeric>
                  {transaction.ReturnTransaction.amount}
                </TableCell>
                <TableCell numeric>
                  {accounting.formatMoney(
                    -(
                      transaction.sell_price *
                      transaction.ReturnTransaction.amount
                    ),
                    'Rp. ',
                    2,
                  )}
                </TableCell>
                <TableCell numeric>
                  {accounting.formatMoney(
                    -(
                      (transaction.sell_price - transaction.capital_price) *
                      transaction.ReturnTransaction.amount
                    ),
                    'Rp. ',
                    2,
                  )}
                </TableCell>
                <TableCell numeric>
                  <div className="d-flex align-items-center justify-content-between">
                    <Tooltip title="Edit" placement="bottom">
                      <EditIcon
                        style={{ fontSize: '16px' }}
                        className="highlight"
                        onClick={() =>
                          onEditReturn(transaction.ReturnTransaction.id)
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Delete" placement="bottom">
                      <div>
                        <ConfirmDialog
                          title="Are you sure?"
                          content="this cannot be undone"
                          onYes={() =>
                            onDeleteReturn(transaction.ReturnTransaction.id)
                          }
                        >
                          {handleClickOpen => (
                            <ClearIcon
                              style={{ fontSize: '16px' }}
                              className="highlight"
                              onClick={handleClickOpen}
                            />
                          )}
                        </ConfirmDialog>
                      </div>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  </Paper>
);
