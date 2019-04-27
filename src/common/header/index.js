import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import { Icon } from "antd";
import { actionCreators } from "./store";
import { Link } from "react-router-dom";
import UserMenu from "./components/userMenu";
import {
  HeaderWrapper,
  Nav,
  Logo,
  Container,
  ContainerItem,
  SearchWrapper,
  ContainerSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  ZyBtn
} from "./style";

class Header extends Component {
  state = {
    activeBtn: ''
  }

  getListArea = () => {
    const {
      handleMouseEnter,
      handleMouseLeave,
      focused,
      mouseIn,
      list
    } = this.props;
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门
            <SearchInfoSwitch>
              换一批
              <Icon type="sync" rotate={20} style={{ marginLeft: "5px" }} />
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {list.map(item => (
              <SearchInfoItem key={item}>{item}</SearchInfoItem>
            ))}
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  };

  render() {
    const {
      focused,
      handleInputFocus,
      handleInputBlur,
      list,
      login
    } = this.props;
    const { activeBtn } = this.state;
    return (
      <HeaderWrapper key={login}>
        <Nav className="clearfix">
          <Link to="/">
            <Logo />
          </Link>
          <Container>
            <ContainerItem className={activeBtn === '' ? "left active" : "left"}>
              <Link to="/">首页</Link>
            </ContainerItem>
            <ContainerItem className={activeBtn === 'forum' ? "left active" : "left"}>
              <Link to="/forum">论坛</Link>
            </ContainerItem>
            <ContainerItem className="right btn">
              <Link to="/write">
                <ZyBtn bgColor="#F8855B">写文章</ZyBtn>
              </Link>
            </ContainerItem>
            <ContainerItem className="right btn">
              {login ? (
                <UserMenu />
              ) : (
                <Link to="/login">
                  <ZyBtn bgColor="#1890FF">登陆</ZyBtn>
                </Link>
              )}
            </ContainerItem>
            <ContainerItem className="right">
              {login ? null : <Link to="/register">注册</Link>}
            </ContainerItem>
            <ContainerItem className="right">
              <i className="iconfont">&#xe636;</i>
            </ContainerItem>
            <SearchWrapper>
              <CSSTransition in={focused} classNames="slide" timeout={550}>
                <ContainerSearch
                  className={focused ? "focused" : ""}
                  onFocus={() => handleInputFocus(list)}
                  onBlur={handleInputBlur}
                />
              </CSSTransition>
              <i className={focused ? "focused iconfont" : "iconfont"}>
                &#xe637;
              </i>
              {this.getListArea(focused)}
            </SearchWrapper>
          </Container>
        </Nav>
      </HeaderWrapper>
    );
  }

  componentDidMount() {
    const { history } = this.props;
    this.setState({
      activeBtn: history.location.pathname.split('/')[1]
    });
  }
}

const mapStateToProps = state => ({
  focused: state.getIn(["header", "focused"]),
  list: state.getIn(["header", "list"]),
  mouseIn: state.getIn(["header", "mouseIn"]),
  login: state.getIn(["login", "login"])
});

const mapDispatchToProps = dispatch => ({
  handleInputFocus: list => {
    dispatch(actionCreators.searchFocus());
    list.size === 0 && dispatch(actionCreators.getList());
  },
  handleInputBlur: () => dispatch(actionCreators.searchBlur()),
  handleMouseEnter: () => dispatch(actionCreators.mouseEnter()),
  handleMouseLeave: () => dispatch(actionCreators.mouseLeave())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
