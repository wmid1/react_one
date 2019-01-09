import React, { Component } from 'react';
import './componentsStyle.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDesc, setTask, setComment, updateCard } from '../../actions/ColAction';

class PopUpCard extends Component {
  state = {
    value: '',
  };

  setTask = event => {
    const valueTask = event.target.value;
    this.props.setTaskAction(valueTask);
  };

  setDesc = event => {
    const valueDesc = event.target.value;
    this.props.setDescAction(valueDesc);
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  close = (indexCol, indexCard) => {
    const card = this.props.cardReducer;
    this.props.updateCardAction(card, indexCol, indexCard);
    this.props.modalChangeOpen(false);
    this.setState({ value: '' });
  };

  addComment = () => {
    if (this.state.value !== '') {
      const { username } = this.props.userReducer;
      const valueComment = this.state.value;
      this.props.setCommentAction(valueComment, username);
      this.setState({ value: '', comment: '' });
    }
  };

  render() {
    const { columnId, cardId, modalIsOpen } = this.props;
    const indexCol = this.props.columnArr.findIndex(obj => obj.id === columnId);

    if (modalIsOpen) {
      const cardBox = this.props.columnArr[indexCol].cards;
      const indexCard = cardBox.findIndex(obj => obj.id === cardId);
      const commentItem = this.props.cardReducer.comments;
      const commentItems = commentItem.map(comment => (
        <div className="comments-inBlock" key={comment.id}>
          <b> {comment.username}</b>
          <p>{comment.value}</p>
        </div>
      ));

      return (
        <div className="p-0 window">
          <div id="content_window" className="col-md-auto">
            <div>
              <button
                className="  justify-content-md-end close align-top mr-2"
                aria-label="Close"
                onClick={() => this.close(columnId, cardId)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="  justify-content-md-center">
                {' '}
                <h2> {this.props.columnArr[indexCol].columnName} </h2>{' '}
              </div>
            </div>
            <div className="  justify-content-md-center mt-4">
              <label>Task name:</label>
              <textarea
                type="text"
                className=" mb-1 mt-1 text_a text_a_include"
                defaultValue={cardBox[indexCard].task}
                onChange={this.setTask}
                rows="2"
              />
            </div>
            <div className=" justify-content-md-center">
              <label>Full description:</label>
              <textarea
                type="text"
                className=" mb-1 mt-1 text_a text_a_include"
                defaultValue={cardBox[indexCard].desc}
                onChange={this.setDesc}
                rows="3"
              />
            </div>
            <div className="  justify-content-md-center">
              <label>Comments:</label>
              <pre className="block_comments mt-1">{commentItems}</pre>
              <textarea
                type="text"
                onChange={this.handleChange}
                value={this.state.value}
                className="comm-a mb-1  text_a text_a_include"
                placeholder={' leave a comment'}
                rows="2"
              />
              <button
                onClick={() => this.addComment(indexCol, indexCard)}
                className="btn btn-secondary ml-2 op mt-2 wth"
              >
                Add comment
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
function mapStateToProps(store) {
  return {
    columnArr: store.columnArr,
    userReducer: store.userReducer,
    cardReducer: store.cardReducer,
  };
}
const mapDispatchToProps = dispatch => ({
  updateCardAction: (card, indexCol, indexCard) => dispatch(updateCard(card, indexCol, indexCard)),
  setTaskAction: valueTask => dispatch(setTask(valueTask)),
  setDescAction: valueDesc => dispatch(setDesc(valueDesc)),
  setCommentAction: (valueComment, username) => dispatch(setComment(valueComment, username)),
});
PopUpCard.propTypes = {
  modalIsOpen: PropTypes.bool,
  cardId: PropTypes.string,
  columnId: PropTypes.string,
  columnArr: PropTypes.array,
  userReducer: PropTypes.object,
  cardReducer: PropTypes.object,
  modalChangeOpen: PropTypes.func,
  setTaskAction: PropTypes.func.isRequired,
  setDescAction: PropTypes.func.isRequired,
  setCommentAction: PropTypes.func.isRequired,
  updateCardAction: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUpCard);
