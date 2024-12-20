import './ReviewSquare.css'

export default function ReviewSquare({review}) {
    console.log(review);
    return <div className='review-square-container'>
        {review.imageUrl!==null ? <div className='review-square-image'>
        </div> : null}
        <div className='review-square-product'>{review.productName}</div>
        <div className='review-square-name'>{review.username}</div>
        <div className='review-square-rating'>{review.rating}/5</div>
        <div className='review-square-text'>{review.comment}</div>
    </div>
}