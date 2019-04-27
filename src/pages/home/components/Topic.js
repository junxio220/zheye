import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TopicWrapper, TopicItem } from "../style";

class Topic extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <TopicWrapper>
        {list.map(item => (
          <TopicItem key={item.get('title')}>
            <img
              className="topic-pic"
              src={item.get('imgUrl')} alt=""
            />
            {item.get('title')}
          </TopicItem>
        ))}
      </TopicWrapper>
    );
  }
}

const mapState = state => ({
  list: state.getIn(["home", "topicList"])
});

const mapDispatch = null;

export default connect(
  mapState,
  mapDispatch
)(Topic);
