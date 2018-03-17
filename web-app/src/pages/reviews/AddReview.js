import React from 'react'

class AddReview extends React.Component {
    state = {
        review: ''
    }

    reviewSubmitted = async () => {
        const {review} = this.state;
        console.log(review);

        // await this.props.contract.addProduct(link, link, link, { from: this.props.accounts[0] })
    }

    render() {
        return (
            <div className="container col-mx-auto" style={{ width: '70%' }}>
                <div className="py-2">
                    <p className="empty-title h3 text-bold">Add Review</p>
                    <div className="form-group">
                        {/*<label class="form-label" for="input-example-3">Review</label>*/}
                        <textarea className="form-input p-2" type="text" value={this.state.review} onChange={(e) => this.inputChanged(e)}  placeholder="Your Review..." rows="3">
                        </textarea>
                    </div>
                    <div className="empty-action pt-2">
                        <button className="btn btn-primary" onClick={this.reviewSubmitted}>Submit Review</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddReview;