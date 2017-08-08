import React, { Component } from 'react'
import { FormGroup, FormControl, Panel } from 'react-bootstrap'
import { STARS } from '../../../types/questions'
import RatingStars from 'react-rating'

class Single extends Component {
  render() {
    return (
      <div>
        <Panel
          header={
            <h3>
              {this.props.index + 1} {this.props.question.title}
              {this.props.question.isRequired ? <span className={'required'}>*</span> : null}
            </h3>
          }
        >
          <FormGroup>
            {
              this.props.question.type === STARS ?
                <RatingStars
                  empty="fa fa-star-o fa-2x"
                  full="fa fa-star fa-2x"
                  initialRate={3}
                />
                :
                <FormControl componentClass="textarea" placeholder="Answer will be here" />
            }
          </FormGroup>
        </Panel>
      </div>
    )
  }
}

export default Single