import { useState } from 'react';
import './Reviews.css';
import Rating from '@mui/material/Rating';
import { checkIfNotInputEmpty, validateEmail } from '../../../../../../../InputValidator';

export default function Reviews({ productID }) {
    console.log(productID)
    const [isOpinionValid, setIsOpinionValid] = useState({
        isNameValid: true,
        isEmailValid: true,
        isReviewValid: true,
    })
    const [opinion, setOpinion] = useState({
        productId: productID,
        reviewerName: "",
        email: "",
        reviewText: "",
        rating: 5,
        image: null
    })
    async function sendReview() {
        if (checkIfNotInputEmpty(opinion.reviewerName) && validateEmail(opinion.email) && checkIfNotInputEmpty(opinion.reviewText)) {
            try {
                const response = fetch(process.env.REACT_APP_API_REVIEWS, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(opinion)
                })
                
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
            } catch (error) {
                console.error(error.message);
            }

        } else {
            setIsOpinionValid({
                isNameValid: checkIfNotInputEmpty(opinion.reviewerName),
                isEmailValid: validateEmail(opinion.email),
                isReviewValid: checkIfNotInputEmpty(opinion.reviewText)
            })
        }

        console.log(opinion)
    }
    return <div id='reviews-container'>
        <div id='user-reviews-container'>

        </div>
        <div id='add-review-container'>
            <span>DODAJ OPINIE</span>
            <span>Twój adres e-mail nie zostanie opublikowany. Wymagane pola są oznaczone <span style={{ color: "red" }}>*</span></span>
            <span>Twoja opinia <span style={{ color: 'red' }}>*</span></span>
            <Rating
                name='opinion-rating'
                value={opinion.rating}
                defaultValue={5}
                precision={1}
                onChange={(event, newValue) => {
                    setOpinion({ ...opinion, rating: parseInt(newValue) })
                }}
            />
            <textarea id='review-input' onChange={(e) => setOpinion({ ...opinion, reviewText: e.target.value })} className={isOpinionValid.isReviewValid ? "" : "incorrect-data"} />
            <span>Nazwa<span style={{ color: 'red' }}>*</span></span>
            <input type='text' id='name-input' onChange={(e) => setOpinion({ ...opinion, reviewerName: e.target.value })} className={isOpinionValid.isNameValid ? "" : "incorrect-data"} />
            <span>E-mail<span style={{ color: 'red' }}>*</span></span>
            <input type='text' id='email-input' onChange={(e) => setOpinion({ ...opinion, email: e.target.value })} className={isOpinionValid.isEmailValid ? "" : "incorrect-data"} />
            <span>Wybierz zdjęcie (maksymalny rozmiar: 2000kB, maksymalnie 1 plik)</span>
            <input type='file' accept='image/png, image/jpg, image/jpeg' onChange={(e) => { setOpinion({ ...opinion, image: e.target.files[0] }) }} />
            <div id='send-review-bttn' onClick={() => sendReview()}>Wyślij</div>
        </div>
    </div>
}