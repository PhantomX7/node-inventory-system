import React from 'react';
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

export default ({ orderTransactions = [], onEdit, onDelete }) => (
  <Paper>
    <Typography variant="title" id="tableTitle" className="ml-3 pt-3">
      Order Transaction List
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Pinyin</TableCell>
          <TableCell numeric>Buy Price</TableCell>
          <TableCell numeric>Amount</TableCell>
          <TableCell numeric>Total Buy Price</TableCell>
          <TableCell numeric />
        </TableRow>
      </TableHead>
      <TableBody>
        {orderTransactions.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell component="th" scope="row">
              {transaction.Product.name}
            </TableCell>
            <TableCell>{transaction.Product.pinyin}</TableCell>
            <TableCell numeric>
              {accounting.formatMoney(transaction.buy_price, 'Rp. ', 2)}
            </TableCell>
            <TableCell numeric>{transaction.amount}</TableCell>
            <TableCell numeric>
              {accounting.formatMoney(transaction.total_buy_price, 'Rp. ', 2)}
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
        ))}
      </TableBody>
    </Table>
  </Paper>
);
