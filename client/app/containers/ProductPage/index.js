/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';

import Menu from 'components/Menu';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

// import injectReducer from 'utils/injectReducer';
import ProductTable from './ProductTable';
import ProductAddModal from './ProductAddModal';
import ProductEditModal from './ProductEditModal';

// import reducer from './reducer';

import { getProducts } from './actions';

import './productPage.scss';

/* eslint-disable react/prefer-stateless-function */
export class ProductPage extends React.Component {
  state = {
    modalAddProductVisible: false,
    modalEditProductVisible: false,
    editProductId: '',
  };

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const { products } = this.props;
    const {
      modalAddProductVisible,
      modalEditProductVisible,
      editProductId,
    } = this.state;
    const productsMenus = [
      {
        name: 'Add Product',
        onClick: () => {
          this.setState({ modalAddProductVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Product</title>
          <meta name="description" content="Description of ProductPage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <ProductAddModal
              onClose={() => this.setState({ modalAddProductVisible: false })}
              visible={modalAddProductVisible}
            />
            <ProductEditModal
              onClose={() => this.setState({ modalEditProductVisible: false })}
              visible={modalEditProductVisible}
              product={products.find(product => product.id === editProductId)}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Product</h4>
              </CardHeader>
              <CardBody>
                <Menu menus={productsMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Product Menu
                    </Button>
                  )}
                </Menu>
                <ProductTable
                  products={products}
                  onClick={id =>
                    this.setState({
                      modalEditProductVisible: true,
                      editProductId: id,
                    })
                  }
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const products = state.get('products');
  return { products };
};

const withConnect = connect(
  mapStateToProps,
  { getProducts },
);

// const withReducer = injectReducer({ key: 'products', reducer });

export default compose(
  // withReducer,
  withConnect,
)(ProductPage);
