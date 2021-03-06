import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

const { object, func, bool } = React.PropTypes;

const smallGrayStyle = {
  'fontSize': 11,
  'color': 'gray'
};

const textContent = {
  'background': '#f8f8f8'
};

const signInComment = {
  marginBottom: 8
};

const PostView = React.createClass({
  propTypes: {
    postContent: object,
    brewContent: object,
    params: object,
    fetchPostContent: func,
    isSignedIn: bool
  },
  componentDidMount () {
    const { b, post } = this.props.params;

    if (!this.props.postContent.title) {
      this.props.fetchPostContent(b, post);
    }
  },
  renderTitle () {
    if (!this.props.postContent.post) {
      return;
    }

    const { title, url } = this.props.postContent.post;
    let short = url;

    if (short) {
      if (short.length > 30) {
        short = short.slice(0, 30) + '...';
      }

      return (
        <div>
          <h2><a href={`${url}`}>{title}</a><br /><span>
            <a href={`${url}`} style={smallGrayStyle}>[ {short} ]</a></span>
          </h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{title}</h2>
        </div>
      );
    }
  },
  renderTextContent () {
    if (!this.props.postContent.post) {
      return;
    }

    const { content } = this.props.postContent.post;
    if (content) {
      return (
        <div className='ui padded segment' style={textContent}>
          <p>{content}</p>
        </div>
      );
    }
  },
  renderCommentBox () {
    const { post } = this.props.postContent;

    if (this.props.isSignedIn) {
      return (
        <CommentBox {...post} parentId={null} {...this.props.params} />
      );
    } else {
      return (
        <Link to={`/signin`}>
          <button className='mini ui compact button' style={signInComment}>
            Sign in to comment
          </button>
        </Link>
      );
    }
  },
  renderCommentList () {
    const { postContent } = this.props;

    if (!postContent.comments) {
      return;
    }

    if (postContent.comments.length) {
      const rootComments = postContent.comments.filter((comment) => {
        return comment.CommentId === null;
      });

      return (
        <div>
          <h3 className='ui dividing header'>Comments</h3>
          <CommentList isRoot comments={rootComments} />
        </div>
      );
    } else {
      return <h3>No comments</h3>;
    }
  },
  render () {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTextContent()}
        {this.renderCommentBox()}
        {this.renderCommentList()}
      </div>
    );
  }
});

function mapStateToProps (state) {
  return {
    postContent: state.postContent,
    brewContent: state.brewContent,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, actions)(PostView);
