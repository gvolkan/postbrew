import React from 'react';
import BrewHeader from './BrewHeader';
import PostList from './PostList';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBrewContent, fetchAllContent } from '../actions/index';

const { object, func } = React.PropTypes;

const BrewContent = React.createClass({
  propTypes: {
    params: object,
    fetchBrewContent: func,
    fetchAllContent: func,
    brewContent: object,
    children: React.PropTypes.element
  },
  componentDidMount () {
    if (!this.props.brewContent.posts) {
      if (this.props.brewContent.pathname === '/') {
        this.props.fetchAllContent();
      } else {
        this.props.fetchBrewContent(this.props.params.b);
      }
    }
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.params.b !== nextProps.params.b) {
      this.props.fetchBrewContent(nextProps.params.b);
    }
  },
  renderHeader () {
    if (this.props.params.post !== undefined) {
      const green = {
        color: '#21BA45'
      };

      return (
        <div>
          <h4>
            <Link to={`/b/${this.props.params.b}`} style={green}>
              /b/{this.props.params.b}
            </Link>
          </h4>
        </div>
      );
    } else {
      return (
        <BrewHeader />
      );
    }
  },
  render () {
    const { brewContent, params, children } = this.props;

    if (brewContent.notFound) {
      return (
        <div>
          <h3>No results found for /b/{params.b}</h3>
        </div>
      );
    } else if (!brewContent.title) {
      return <div></div>;
    } else if (brewContent.title === '[ postbrew ]') {
      return (
        <div className='ui container'>
          <BrewHeader />
          <PostList />
        </div>
      );
    } else {
      return (
        <div className='ui container'>
          {this.renderHeader()}
          {children}
        </div>
      );
    }
  }
});

function mapStateToProps (state) {
  return {
    brewContent: state.brewContent
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchBrewContent, fetchAllContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrewContent);
