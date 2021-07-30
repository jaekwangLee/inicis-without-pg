import React, { lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Main = lazy(() => import('./pages/main'));
const Shop = lazy(() => import('./pages/shop'));
const Payment = lazy(() => import('./pages/payment'));

class App extends React.PureComponent {
    render() {
        return (
            <AppContainer>
                <ul>
                    <LinkingLi
                        onClick={() => {
                            this.props.history.push('/');
                        }}
                    >
                        메인 페이지
                    </LinkingLi>
                    <LinkingLi
                        onClick={() => {
                            this.props.history.push('/shop/list');
                        }}
                    >
                        주문 페이지
                    </LinkingLi>
                </ul>

                <Switch>
                    <Route exact path='/' render={props => <Main {...props} />} />
                    <Route path='/shop/:step/:orderId' render={props => <Shop {...props} />} />
                    <Route path='/shop/:step' render={props => <Shop {...props} />} />
                    <Route path='/payment/:status/:orderId' render={props => <Payment {...props} />} />
                    <Route path='/payment/:status' render={props => <Payment {...props} />} />
                </Switch>
            </AppContainer>
        );
    }
}

const AppContainer = styled.div`
    width: 100%;
`;

const LinkingLi = styled.li`
    text-decoration: underline;
    cursor: pointer;
`;

export default withRouter(App);
