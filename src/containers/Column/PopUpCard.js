import React, { Component } from 'react';
import './componentsStyle.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDesc, setTask, setComment, setUserTask } from '../../actions/ColAction';

class PopUpCard extends Component {
  state = {
    update: false,
    comm: 0,
    comment: '',
    task: '',
    value: '',
  };

  setTask = event => {
    const { columnId, cardId } = this.props;
    const { username } = this.props.params;
    this.setState({ task: event.target.value });
    this.props.setUserTask(columnId, cardId, username);
  };

  setDesc = event => {
    const { username } = this.props.params;
    this.props.update(true);
    const { columnId, cardId } = this.props;
    const valueDesc = event.target.value;
    this.props.setDescAction(columnId, cardId, valueDesc, username);
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
    this.setState({ value: event.target.value });
  };

  close = () => {
    this.setState({ update: true });
    const { columnId, cardId } = this.props;
    const valueTask = this.state.task;
    this.props.update(true);
    this.props.modalChangeOpen(false);
    if (valueTask !== '') {
      this.props.setTaskAction(columnId, cardId, valueTask);
    }
  };

  addComment = () => {
    if (this.state.value !== '') {
      const { username } = this.props.params;
      const { columnId, cardId } = this.props;
      const valueComment = this.state.comment;
      this.props.setCommentAction(columnId, cardId, valueComment, username);
      this.setState({ value: '' });
      this.setState({ comment: '' });
      this.setState({ update: true });
    }
  };

  render() {
    const onChange = this.handleChange;
    const { columnId, cardId, modalIsOpen } = this.props;

    if (modalIsOpen) {
      const cardBox = this.props.columnNames[columnId - 1].card;
      const idWindow = `id${columnId},${cardId}`;
      const task = `${columnId},${cardId}`;
      const description = `description_${task}`;
      const comments = `comments_${task}`;
      const commentItem = cardBox[cardId - 1].commentsQuant;
      const commentItems = commentItem.map(number => (
        <div className="comments-inBlock" key={number}>
          <b>{cardBox[cardId - 1].userComments[number - 1]}</b>
          <p>{cardBox[cardId - 1].comments[number - 1]}</p>
        </div>
      ));

      return (
        <div id={idWindow} className="p-0 window">
          <div id="content_window" className="col-md-auto">
            <div>
              <button
                className="  justify-content-md-end close align-top mr-2"
                aria-label="Close"
                onClick={() => this.close(idWindow)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="  justify-content-md-center">
                {' '}
                <h2> {this.props.columnNames[columnId - 1].columnName} </h2>{' '}
              </div>
            </div>
            <div className="  justify-content-md-center mt-4">
              <label htmlFor={task}>Task name:</label>
              <textarea
                type="text"
                className=" mb-1 mt-1 text_a text_a_include"
                id={task}
                defaultValue={cardBox[cardId - 1].task}
                onChange={this.setTask}
                rows="2"
              />
              <div type="text" className=" username_include">
                {' '}
                {cardBox[cardId - 1].userTask}{' '}
              </div>
            </div>
            <div className=" justify-content-md-center">
              <label>Full description:</label>
              <textarea
                type="text"
                className=" mb-1 mt-1 text_a text_a_include"
                id={description}
                defaultValue={cardBox[cardId - 1].desc}
                onChange={this.setDesc}
                rows="3"
              />
              <div className=" username_include"> {cardBox[cardId - 1].userDesc} </div>
            </div>
            <div className="  justify-content-md-center">
              <label>Comments:</label>
              <div className="block_comments mt-1">{commentItems}</div>
              <textarea
                type="text"
                id={comments}
                onChange={onChange}
                value={this.state.value}
                className="comm-a mb-1  text_a text_a_include"
                placeholder={' leave a comment'}
                rows="2"
              />
              <button onClick={() => this.addComment(task)} className="btn btn-secondary ml-2 op mt-2 wth">
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
    columnNames: store.columnNames,
    params: store.params,
  };
}
const mapDispatchToProps = dispatch => ({
  setTaskAction: (columnId, cardId, valueTask) => dispatch(setTask(columnId, cardId, valueTask)),
  setDescAction: (columnId, cardId, valueDesc, username) => dispatch(setDesc(columnId, cardId, valueDesc, username)),
  setCommentAction: (columnId, cardId, valueComment, username) =>
    dispatch(setComment(columnId, cardId, valueComment, username)),
  setUserTask: (columnId, cardId, username) => dispatch(setUserTask(columnId, cardId, username)),
});
PopUpCard.propTypes = {
  modalIsOpen: PropTypes.bool,
  cardId: PropTypes.number,
  columnId: PropTypes.number,
  update: PropTypes.func,
  modalChangeOpen: PropTypes.func,
  columnNames: PropTypes.array,
  params: PropTypes.object,
  setTaskAction: PropTypes.func.isRequired,
  setDescAction: PropTypes.func.isRequired,
  setCommentAction: PropTypes.func.isRequired,
  setUserTask: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUpCard);
