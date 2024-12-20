import './ReviewSquare.css'

export default function ReviewSquare({review}) {
    if(review.imageUrl!==null) console.log("REVIEW:",review);
    return <div className='review-square-container'>
        {review.imageUrl!==null ? <div className='review-square-image' style={{backgroundImage:`url(${process.env.REACT_APP_API_IMAGES}${review.imageUrl})`}}>
        </div> : null}
        <div className='review-square-product'>{review.productName}</div>
        <div className='review-square-name'>{review.username}</div>
        <div className='review-square-rating'>{review.rating}/5</div>
        <div className='review-square-text'>{review.comment}</div>
    </div>
}