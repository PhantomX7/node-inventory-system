/**
 *
 * DashboardMainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import accounting from 'accounting';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import IncomeIcon from '@material-ui/icons/AttachMoney';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { getStatistic } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class DashboardMainPage extends React.Component {
  componentDidMount() {
    const { getStatistic } = this.props;
    getStatistic();
  }

  render() {
    const { statistic } = this.props;
    const { income, incomeCash, totalSales, totalCashSales } = statistic;
    return (
      <div>
        <Helmet>
          <title>DashboardMainPage</title>
          <meta name="description" content="Description of DashboardMainPage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <IncomeIcon />
                </CardIcon>
                <div className="text-muted pt-1 pr-1">
                  <big>Monthly Incomes</big>
                </div>
                <h5 className="text-dark">
                  {accounting.formatMoney(income, 'Rp. ', 2)}
                </h5>
              </CardHeader>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    View Details
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <IncomeIcon />
                </CardIcon>
                <div className="text-muted pt-1 pr-1">
                  <big>Monthly Incomes Cash</big>
                </div>
                <h5 className="text-dark">
                  {accounting.formatMoney(incomeCash, 'Rp. ', 2)}
                </h5>
              </CardHeader>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    View Details
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <IncomeIcon />
                </CardIcon>
                <div className="text-muted pt-1 pr-1">
                  <big>Monthly Sales</big>
                </div>
                <h5 className="text-dark">
                  {accounting.formatMoney(totalSales, 'Rp. ', 2)}
                </h5>
              </CardHeader>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    View Details
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <IncomeIcon />
                </CardIcon>
                <div className="text-muted pt-1 pr-1">
                  <big>Monthly Cash Sales</big>
                </div>
                <h5 className="text-dark">
                  {accounting.formatMoney(totalCashSales, 'Rp. ', 2)}
                </h5>
              </CardHeader>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    View Details
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const statistic = state.get('statistic');
  return { statistic };
};

const withConnect = connect(
  mapStateToProps,
  { getStatistic },
);

const withReducer = injectReducer({ key: 'statistic', reducer });

export default compose(
  withReducer,
  withConnect,
)(DashboardMainPage);
