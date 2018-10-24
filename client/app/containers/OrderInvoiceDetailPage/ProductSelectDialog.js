import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';

import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

class ConfirmDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { title, noText, onSelect, products } = this.props;
    return (
      <div>
        {this.props.children(this.handleClickOpen)}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <ReactTable
              className="-striped -highlight select"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
              }
              data={products}
              columns={[
                {
                  Header: 'Name',
                  accessor: 'name',
                  Cell: props => (
                    <ListItem
                      className="p-2"
                      button
                      onClick={() => {
                        this.handleClose();
                        onSelect(props.original.id);
                      }}
                    >
                      {props.value}
                    </ListItem>
                  ),
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['name'] }),
                  filterAll: true,
                },
                {
                  Header: 'Pinyin',
                  accessor: 'pinyin',
                  Cell: props => (
                    <ListItem className="p-2">{props.value}</ListItem>
                  ),
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['pinyin'] }),
                  filterAll: true,
                },
                {
                  Header: 'Stock',
                  accessor: 'stock',
                  Cell: props => (
                    <ListItem className="p-2">{props.value}</ListItem>
                  ),
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['stock'] }),
                  filterAll: true,
                },
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {noText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmDialog.defaultProps = {
  noText: 'Cancel',
};

export default ConfirmDialog;
